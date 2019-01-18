var htmlCanvas,ctx,win_l,win_h,size,radius,vectors,mousePos,coords,blue="#5a8ded",red="#d61d45",white="#f3f7f3";function main(){htmlCanvas=document.getElementById("myCanvas"),ctx=htmlCanvas.getContext("2d"),vectors=[],mousePos=[],win_l=.96*window.innerWidth,win_h=.96*window.innerHeight,size=Math.min(win_h,win_l),radius=size/70,ctx.canvas.width=size,ctx.canvas.height=size,htmlCanvas.addEventListener("mousedown",function(e){coords=htmlCanvas.relMouseCoords(event),mousePos=[coords.x,coords.y]},!1),htmlCanvas.addEventListener("mouseup",function(e){if(coords=htmlCanvas.relMouseCoords(event),1===e.which&&isClose(mousePos,[coords.x,coords.y],radius))ctxEvent();else if(1==e.which){var t=getVectorByPosition(mousePos,vectors,null),o=getVectorByPosition([coords.x,coords.y],vectors,t);null!=t&&null!=o?console.log(t.index+":"+o.index):console.log(t+":"+o),mousePos=[coords.x,coords.y]}mousePos=[coords.x,coords.y]},!1),htmlCanvas.addEventListener("wheel",function(e){scrollEvent(e)},!1)}function ctxEvent(){nodeEventHandler(coords=htmlCanvas.relMouseCoords(event),radius,!1,null)}function scrollEvent(e){var t=0,o=e.deltaY;0<vectors.length&&(o<0&&size/65<=radius&&(console.log("down"),t=-2),0<o&&radius<=size/60&&(console.log("up"),t=2)),radius+=t;for(var s=0;s<vectors.length;s++)temp=vectors[s],vectors[s].clearRegion(),vectors[s]=new Node(temp.x,temp.y,radius,temp.fill,1,s),vectors[s].draw()}function nodeEventHandler(e,t,o,s){if(e.x>t&&e.x<size-t&&e.y>t&&e.y<size-t){for(var n=0;n<vectors.length;n++)null!=(s=vectors[n])&&s.isClicked(e.x,e.y)&&(s.clearRegion(),vectors.splice(n,1),o=!0);0==o&&((s=new Node(e.x,e.y,t,white,1,vectors.length-1)).isCollision(vectors)||vectors.push(s))}0<vectors.length&&((s=vectors[0]).clearRegion(),vectors[0]=new Node(s.x,s.y,s.r,blue,1,0),vectors[0].draw());for(n=1;n<vectors.length-1;n++)s=vectors[n],vectors[n].clearRegion(),vectors[n]=new Node(s.x,s.y,s.r,white,1,n),vectors[n].draw();1<vectors.length&&((s=vectors[vectors.length-1]).clearRegion(),vectors[vectors.length-1]=new Node(s.x,s.y,s.r,red,1,vectors.length-1),vectors[vectors.length-1].draw())}function Edge(e,t){this.head=e,this.tail=t,this.draw=function(){ctx.beginPath(),ctx.globalCompositeOperation="destination-over",ctx.moveTo(e.x,e.y),ctx.lineTo(t.x,t.y),ctx.stroke(),ctx.globalCompositeOperation="source-over"}}function Node(i,r,s,e,t,o){this.startingAngle=0,this.endAngle=2*Math.PI,this.x=i,this.y=r,this.r=s,this.region=size/60*2.2,this.index=o,this.fill=e,this.stroke=t,this.draw=function(){ctx.beginPath(),ctx.arc(this.x,this.y,this.r,this.startingAngle,this.endAngle),ctx.fillStyle=this.fill,ctx.lineWidth=3,ctx.fill(),ctx.strokeStyle=this.stroke,ctx.stroke(),size/60<=s&&(ctx.font="12pt Gill Sans",ctx.fillStyle="black",ctx.textAlign="center",ctx.fillText(o,this.x,this.y+3))},this.clearRegion=function(){ctx.clearRect(this.x-this.region/2,this.y-this.region/2,this.region,this.region)},this.isClicked=function(e,t){var o=!1;return i-s<e&&e<i+s&&r-s<t&&t<r+s&&(o=!0),o},this.isCollision=function(e){for(var t=!1,o=0;o<e.length;o++)if(null!=e[o]){var s=e[o].x,n=e[o].y;s>i-this.region&&s<i+this.region&&n>r-this.region&&n<r+this.region&&(t=!0)}return t}}function relMouseCoords(e){for(var t=0,o=0,s=this;t+=s.offsetLeft-s.scrollLeft,o+=s.offsetTop-s.scrollTop,s=s.offsetParent;);return{x:e.pageX-t,y:e.pageY-o}}function isClose(e,t,o){for(var s=Math.min(e.length,t.length),n=!0,i=0;i<s;i++)o<Math.abs(e[i]-t[i])&&(n=!1);return n}function getVectorByPosition(e,t,o){for(var s=null,n=0;n<t.length;n++)if(t[n].isClicked(e[0],e[1])&&t[n]!=o){s=t[n];break}return s}HTMLCanvasElement.prototype.relMouseCoords=relMouseCoords,CanvasRenderingContext2D.prototype.clear=function(){ctx.clearRect(0,0,size,size),vectors=[]};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiaHRtbENhbnZhcyIsImN0eCIsIndpbl9sIiwid2luX2giLCJzaXplIiwicmFkaXVzIiwidmVjdG9ycyIsIm1vdXNlUG9zIiwiY29vcmRzIiwiYmx1ZSIsInJlZCIsIndoaXRlIiwibWFpbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiTWF0aCIsIm1pbiIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwicmVsTW91c2VDb29yZHMiLCJldmVudCIsIngiLCJ5Iiwid2hpY2giLCJpc0Nsb3NlIiwiY3R4RXZlbnQiLCJoIiwiZ2V0VmVjdG9yQnlQb3NpdGlvbiIsInQiLCJjb25zb2xlIiwibG9nIiwiaW5kZXgiLCJzY3JvbGxFdmVudCIsIm5vZGVFdmVudEhhbmRsZXIiLCJzY3JvbGwiLCJkZWx0YVkiLCJsZW5ndGgiLCJpIiwidGVtcCIsImNsZWFyUmVnaW9uIiwiTm9kZSIsImZpbGwiLCJkcmF3IiwicmVtb3ZlZCIsImlzQ2xpY2tlZCIsInNwbGljZSIsImlzQ29sbGlzaW9uIiwicHVzaCIsInIiLCJFZGdlIiwiaGVhZCIsInRhaWwiLCJ0aGlzIiwiYmVnaW5QYXRoIiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwic3RhcnRpbmdBbmdsZSIsImVuZEFuZ2xlIiwiUEkiLCJyZWdpb24iLCJhcmMiLCJmaWxsU3R5bGUiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJmaWxsVGV4dCIsImNsZWFyUmVjdCIsImluX3giLCJpbl95IiwiY2xpY2tlZCIsImFyciIsInRvdGFsT2Zmc2V0WCIsInRvdGFsT2Zmc2V0WSIsImN1cnJlbnRFbGVtZW50Iiwib2Zmc2V0TGVmdCIsInNjcm9sbExlZnQiLCJvZmZzZXRUb3AiLCJzY3JvbGxUb3AiLCJvZmZzZXRQYXJlbnQiLCJwYWdlWCIsInBhZ2VZIiwiYSIsImIiLCJmYWN0b3IiLCJyZXN1bHQiLCJhYnMiLCJwb3MiLCJ2Iiwib21pdCIsIkhUTUxDYW52YXNFbGVtZW50IiwicHJvdG90eXBlIiwiQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIiwiY2xlYXIiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFdBQ0FDLElBQ0FDLE1BQ0FDLE1BQ0FDLEtBQ0FDLE9BQ0FDLFFBQ0FDLFNBQ0FDLE9BRUFDLEtBQU8sVUFDUEMsSUFBTSxVQUNOQyxNQUFRLFVBRVosU0FBU0MsT0FDTFosV0FBYWEsU0FBU0MsZUFBZSxZQUNyQ2IsSUFBTUQsV0FBV2UsV0FBVyxNQUM1QlQsUUFBVSxHQUNWQyxTQUFXLEdBQ1hMLE1BQTRCLElBQXBCYyxPQUFPQyxXQUNmZCxNQUE2QixJQUFyQmEsT0FBT0UsWUFDZmQsS0FBT2UsS0FBS0MsSUFBSWpCLE1BQU9ELE9BQ3ZCRyxPQUFTRCxLQUFPLEdBQ2hCSCxJQUFJb0IsT0FBT0MsTUFBU2xCLEtBQ3BCSCxJQUFJb0IsT0FBT0UsT0FBU25CLEtBRXBCSixXQUFXd0IsaUJBQWlCLFlBQWMsU0FBU0MsR0FDL0NqQixPQUFTUixXQUFXMEIsZUFBZUMsT0FDbkNwQixTQUFXLENBQUNDLE9BQU9vQixFQUFHcEIsT0FBT3FCLEtBQzlCLEdBR0g3QixXQUFXd0IsaUJBQWlCLFVBQVksU0FBU0MsR0FHN0MsR0FGQWpCLE9BQVNSLFdBQVcwQixlQUFlQyxPQUVsQixJQUFiRixFQUFHSyxPQUFlQyxRQUFReEIsU0FBVSxDQUFDQyxPQUFPb0IsRUFBSXBCLE9BQU9xQixHQUFJLFFBQzNERyxnQkFFQyxHQUFlLEdBQVpQLEVBQUdLLE1BQVcsQ0FDbEIsSUFBSUcsRUFBSUMsb0JBQW9CM0IsU0FBVUQsUUFBUyxNQUMzQzZCLEVBQUlELG9CQUFvQixDQUFDMUIsT0FBT29CLEVBQUdwQixPQUFPcUIsR0FBSXZCLFFBQVMyQixHQUVuRCxNQUFMQSxHQUFrQixNQUFM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QUFJLEdBQUlBLEVBQUksS0FDdkJDLEVBQUVyRCxJQUFNc0QsRUFBSyxDQUNaM0MsRUFBSTBDLEVBQUVyRCxHQUNOLE1BS1osT0FBT1csRUFHWDRDLGtCQUFrQkMsVUFBVTFFLGVBQWlCQSxlQUU3QzJFLHlCQUF5QkQsVUFBVUUsTUFBUSxXQUN2Q3JHLElBQUkyRSxVQUFVLEVBQUUsRUFBRXhFLEtBQUtBLE1BQ3ZCRSxRQUFVIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBodG1sQ2FudmFzO1xudmFyIGN0eDtcbnZhciB3aW5fbDtcbnZhciB3aW5faDtcbnZhciBzaXplO1xudmFyIHJhZGl1cztcbnZhciB2ZWN0b3JzO1xudmFyIG1vdXNlUG9zO1xudmFyIGNvb3JkcztcblxudmFyIGJsdWUgPSBcIiM1YThkZWRcIjtcbnZhciByZWQgPSBcIiNkNjFkNDVcIjtcbnZhciB3aGl0ZSA9IFwiI2YzZjdmM1wiO1xuXG5mdW5jdGlvbiBtYWluKCkge1xuICAgIGh0bWxDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpO1xuICAgIGN0eCA9IGh0bWxDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB2ZWN0b3JzID0gW107XG4gICAgbW91c2VQb3MgPSBbXTtcbiAgICB3aW5fbCA9IHdpbmRvdy5pbm5lcldpZHRoICogMC45NjtcbiAgICB3aW5faCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuOTY7XG4gICAgc2l6ZSA9IE1hdGgubWluKHdpbl9oLCB3aW5fbCk7XG4gICAgcmFkaXVzID0gc2l6ZSAvIDcwO1xuICAgIGN0eC5jYW52YXMud2lkdGggID0gc2l6ZTtcbiAgICBjdHguY2FudmFzLmhlaWdodCA9IHNpemU7XG5cbiAgICBodG1sQ2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGNvb3JkcyA9IGh0bWxDYW52YXMucmVsTW91c2VDb29yZHMoZXZlbnQpO1xuICAgICAgICBtb3VzZVBvcyA9IFtjb29yZHMueCwgY29vcmRzLnldO1xuICAgIH0sIGZhbHNlKTtcblxuXG4gICAgaHRtbENhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgY29vcmRzID0gaHRtbENhbnZhcy5yZWxNb3VzZUNvb3JkcyhldmVudCk7XG5cbiAgICAgICAgaWYgKGV2LndoaWNoID09PSAxICYmIGlzQ2xvc2UobW91c2VQb3MsIFtjb29yZHMueCAsIGNvb3Jkcy55XSwgKHJhZGl1cykpKSB7XG4gICAgICAgICAgICBjdHhFdmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZXYud2hpY2ggPT0gMSl7XG4gICAgICAgICAgICB2YXIgaCA9IGdldFZlY3RvckJ5UG9zaXRpb24obW91c2VQb3MsIHZlY3RvcnMsIG51bGwpO1xuICAgICAgICAgICAgdmFyIHQgPSBnZXRWZWN0b3JCeVBvc2l0aW9uKFtjb29yZHMueCwgY29vcmRzLnldLCB2ZWN0b3JzLCBoKTtcblxuICAgICAgICAgICAgaWYoaCAhPSBudWxsICYmIHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaC5pbmRleCArIFwiOlwiICsgdC5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGggKyBcIjpcIiArIHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtb3VzZVBvcyA9IFtjb29yZHMueCwgY29vcmRzLnldO1xuICAgICAgICB9XG5cbiAgICAgICAgbW91c2VQb3MgPSBbY29vcmRzLngsIGNvb3Jkcy55XTtcbiAgICB9LCBmYWxzZSk7XG5cblxuICAgIGh0bWxDYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBmdW5jdGlvbihldikge1xuICAgICAgICBzY3JvbGxFdmVudChldik7XG4gICAgfSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBjdHhFdmVudCgpe1xuICAgIHZhciByZW1vdmVkID0gZmFsc2U7XG4gICAgdmFyIHRlbXAgPSBudWxsO1xuICAgIGNvb3JkcyA9IGh0bWxDYW52YXMucmVsTW91c2VDb29yZHMoZXZlbnQpO1xuXG5cbiAgICBub2RlRXZlbnRIYW5kbGVyKGNvb3JkcywgcmFkaXVzLCByZW1vdmVkLCB0ZW1wKTtcbiAgICBcbn1cblxuZnVuY3Rpb24gc2Nyb2xsRXZlbnQoZXYpe1xuICAgIHZhciBzY3JvbGwgPSAwO1xuICAgIHZhciB5ID0gZXYuZGVsdGFZO1xuXG4gICAgaWYodmVjdG9ycy5sZW5ndGggPiAwKXtcbiAgICAgICAgaWYgKHkgPCAwICYmIHJhZGl1cyA+PSAoc2l6ZSAvIDY1KSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkb3duXCIpO1xuICAgICAgICAgICAgc2Nyb2xsID0gLTI7ICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSA+IDAgJiYgcmFkaXVzIDw9IChzaXplIC8gNjApKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVwXCIpO1xuICAgICAgICAgICAgc2Nyb2xsID0gMjsgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJhZGl1cyArPSBzY3JvbGw7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdmVjdG9ycy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHRlbXAgPSB2ZWN0b3JzW2ldO1xuICAgICAgICB2ZWN0b3JzW2ldLmNsZWFyUmVnaW9uKCk7XG4gICAgICAgIHZlY3RvcnNbaV0gPSBuZXcgTm9kZSh0ZW1wLngsIHRlbXAueSwgcmFkaXVzLCB0ZW1wLmZpbGwsIDEsIGkpO1xuICAgICAgICB2ZWN0b3JzW2ldLmRyYXcoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vZGVFdmVudEhhbmRsZXIoY29vcmRzLCByYWRpdXMsIHJlbW92ZWQsIHRlbXApe1xuXG4gICAgLy9UaGUgY29uZGl0aW9ucyBnbyBhcyBmb2xsb3dzOlxuICAgIC8vMSkgVGhlIGNpcmNsZSBtdXN0IGZpdCBpbiB0aGUgY2FudmFzIChsaW5lcyA0Mi00MylcbiAgICAvLzIpIFRoZSBjaXJjbGUgbXVzdCBub3Qgb3ZlcmxhcCAobGluZXMgNDcpXG4gICAgLy8zKSBJZiB0aGUgY2lyY2xlIGlzIGFscmVhZHkgcHJlc2VudCBkbyBub3QgYWRkLCBidXQgcmVtb3ZlXG5cbiAgICBpZihjb29yZHMueCA+IHJhZGl1cyAmJiBjb29yZHMueCA8IHNpemUgLSByYWRpdXMpe1xuICAgICAgICBpZihjb29yZHMueSA+IHJhZGl1cyAmJiBjb29yZHMueSA8IHNpemUgLSByYWRpdXMpe1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHZlY3RvcnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRlbXAgPSB2ZWN0b3JzW2ldO1xuICAgICAgICAgICAgICAgIGlmKHRlbXAgIT0gbnVsbCAmJiB0ZW1wLmlzQ2xpY2tlZChjb29yZHMueCwgY29vcmRzLnkpKXtcbiAgICAgICAgICAgICAgICAgICAgdGVtcC5jbGVhclJlZ2lvbigpO1xuICAgICAgICAgICAgICAgICAgICB2ZWN0b3JzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihyZW1vdmVkID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICB0ZW1wID0gbmV3IE5vZGUoY29vcmRzLngsIGNvb3Jkcy55LCByYWRpdXMsIHdoaXRlLCAxLCB2ZWN0b3JzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmKCF0ZW1wLmlzQ29sbGlzaW9uKHZlY3RvcnMpKXtcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9ycy5wdXNoKHRlbXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vcmVkcmF3IG5vZGVzIGFzIGZvbGxvd3NcbiAgICAvL2lmIHRoZSBoZWFkIHlvdXIgYmx1ZVxuICAgIC8vaWYgdGhlIHRhaWwgeW91ciByZWRcbiAgICAvL2Vsc2UgeW91ciBncmVlblxuXG4gICAgaWYodmVjdG9ycy5sZW5ndGggPiAwKXtcbiAgICAgICAgdGVtcCA9IHZlY3RvcnNbMF07XG4gICAgICAgIHRlbXAuY2xlYXJSZWdpb24oKTtcbiAgICAgICAgdmVjdG9yc1swXSA9IG5ldyBOb2RlKHRlbXAueCwgdGVtcC55LCB0ZW1wLnIsIGJsdWUsIDEsIDApO1xuICAgICAgICB2ZWN0b3JzWzBdLmRyYXcoKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgdmVjdG9ycy5sZW5ndGggLSAxOyBpKyspe1xuICAgICAgICB0ZW1wID0gdmVjdG9yc1tpXTtcbiAgICAgICAgdmVjdG9yc1tpXS5jbGVhclJlZ2lvbigpO1xuICAgICAgICB2ZWN0b3JzW2ldID0gbmV3IE5vZGUodGVtcC54LCB0ZW1wLnksIHRlbXAuciwgd2hpdGUsIDEsIGkpO1xuICAgICAgICB2ZWN0b3JzW2ldLmRyYXcoKTtcbiAgICB9XG5cbiAgICBpZih2ZWN0b3JzLmxlbmd0aCA+IDEpe1xuICAgICAgICB0ZW1wID0gdmVjdG9yc1t2ZWN0b3JzLmxlbmd0aCAtIDFdO1xuICAgICAgICB0ZW1wLmNsZWFyUmVnaW9uKCk7XG4gICAgICAgIHZlY3RvcnNbdmVjdG9ycy5sZW5ndGggLSAxXSA9IG5ldyBOb2RlKHRlbXAueCwgdGVtcC55LCB0ZW1wLnIsIHJlZCwgMSwgdmVjdG9ycy5sZW5ndGggLSAxKTtcbiAgICAgICAgdmVjdG9yc1t2ZWN0b3JzLmxlbmd0aCAtIDFdLmRyYXcoKTtcbiAgICB9XG4gICAgXG59XG5cbmZ1bmN0aW9uIEVkZ2UoaGVhZCwgdGFpbCl7XG4gICAgdGhpcy5oZWFkID0gaGVhZDtcbiAgICB0aGlzLnRhaWwgPSB0YWlsO1xuXG4gICAgdGhpcy5kcmF3ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW92ZXInO1xuICAgICAgICBjdHgubW92ZVRvKGhlYWQueCwgaGVhZC55KTtcbiAgICAgICAgY3R4LmxpbmVUbyh0YWlsLngsIHRhaWwueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBOb2RlKHgsIHksIHIsIGZpbGwsIHN0cm9rZSwgaW5kZXgpIHtcbiAgICB0aGlzLnN0YXJ0aW5nQW5nbGUgPSAwO1xuICAgIHRoaXMuZW5kQW5nbGUgPSAyICogTWF0aC5QSTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLnJlZ2lvbiA9IChzaXplIC8gNjApICogMi4yO1xuICAgIFxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmZpbGwgPSBmaWxsO1xuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuXG4gICAgdGhpcy5kcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMuciwgdGhpcy5zdGFydGluZ0FuZ2xlLCB0aGlzLmVuZEFuZ2xlKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuZmlsbDtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc3Ryb2tlO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGlmKHIgPj0gc2l6ZSAvIDYwKXtcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzEycHQgR2lsbCBTYW5zJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGluZGV4LCB0aGlzLngsIHRoaXMueSszKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2xlYXJSZWdpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCh0aGlzLnggLSAodGhpcy5yZWdpb24gLyAyKSwgdGhpcy55IC0gKHRoaXMucmVnaW9uIC8gMiksIHRoaXMucmVnaW9uLCB0aGlzLnJlZ2lvbik7XG4gICAgfVxuXG4gICAgdGhpcy5pc0NsaWNrZWQgPSBmdW5jdGlvbiAoaW5feCwgaW5feSkge1xuICAgICAgICB2YXIgY2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmKGluX3ggPiAoeCAtIHIpICYmIGluX3ggPCAoeCArIHIpKXtcbiAgICAgICAgICAgIGlmKGluX3kgPiAoeSAtIHIpICYmIGluX3kgPCAoeSArIHIpKXtcbiAgICAgICAgICAgICAgICBjbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbGlja2VkO1xuICAgIH1cblxuICAgIHRoaXMuaXNDb2xsaXNpb24gPSBmdW5jdGlvbihhcnIpe1xuICAgICAgICB2YXIgY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihhcnJbaV0gIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdmFyIGluX3ggPSBhcnJbaV0ueDtcbiAgICAgICAgICAgICAgICB2YXIgaW5feSA9IGFycltpXS55O1xuXG4gICAgICAgICAgICAgICAgaWYoaW5feCA+ICh4IC0gdGhpcy5yZWdpb24pICYmIGluX3ggPCAoeCArIHRoaXMucmVnaW9uKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGluX3kgPiAoeSAtIHRoaXMucmVnaW9uKSAmJiBpbl95IDwgKHkgKyB0aGlzLnJlZ2lvbikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xpY2tlZDtcblxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVsTW91c2VDb29yZHMoZXZlbnQpe1xuICAgIHZhciB0b3RhbE9mZnNldFggPSAwO1xuICAgIHZhciB0b3RhbE9mZnNldFkgPSAwO1xuICAgIHZhciBjYW52YXNYID0gMDtcbiAgICB2YXIgY2FudmFzWSA9IDA7XG4gICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gdGhpcztcblxuICAgIGRve1xuICAgICAgICB0b3RhbE9mZnNldFggKz0gY3VycmVudEVsZW1lbnQub2Zmc2V0TGVmdCAtIGN1cnJlbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIHRvdGFsT2Zmc2V0WSArPSBjdXJyZW50RWxlbWVudC5vZmZzZXRUb3AgLSBjdXJyZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfVxuICAgIHdoaWxlKGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQub2Zmc2V0UGFyZW50KVxuXG4gICAgY2FudmFzWCA9IGV2ZW50LnBhZ2VYIC0gdG90YWxPZmZzZXRYO1xuICAgIGNhbnZhc1kgPSBldmVudC5wYWdlWSAtIHRvdGFsT2Zmc2V0WTtcblxuICAgIHJldHVybiB7eDpjYW52YXNYLCB5OmNhbnZhc1l9XG59XG5cbmZ1bmN0aW9uIGlzQ2xvc2UoYSwgYiwgZmFjdG9yKXtcbiAgICB2YXIgc2l6ZSA9IE1hdGgubWluKGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgdmFyIGRpZmYgPSAwOyBcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspe1xuICAgICAgICBkaWZmID0gTWF0aC5hYnMoYVtpXSAtIGJbaV0pO1xuICAgICAgICBcbiAgICAgICAgaWYoZGlmZiA+IGZhY3Rvcil7XG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldFZlY3RvckJ5UG9zaXRpb24ocG9zLCB2LCBvbWl0KXtcbiAgICB2YXIgciA9IG51bGw7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdi5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKHZbaV0uaXNDbGlja2VkKHBvc1swXSwgcG9zWzFdKSl7XG4gICAgICAgICAgICBpZih2W2ldICE9IG9taXQpe1xuICAgICAgICAgICAgICAgIHIgPSB2W2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHI7XG59XG5cbkhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZS5yZWxNb3VzZUNvb3JkcyA9IHJlbE1vdXNlQ29vcmRzO1xuXG5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcbiAgICBjdHguY2xlYXJSZWN0KDAsMCxzaXplLHNpemUpO1xuICAgIHZlY3RvcnMgPSBbXTtcbn0iXX0=
