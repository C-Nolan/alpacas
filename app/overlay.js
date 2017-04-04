window.onload=function(){
     var test = document.getElementById("cbVision");
      test.addEventListener("click", function() { 
          addRemoveInput();
      });
}

function addRemoveInput(){
  var input = document.getElementById('numVision');

  if(input != null) {
    document.getElementById('inHolder').innerHTML = '';

  } else {
    document.getElementById('inHolder').innerHTML = '<div class="input-group" id="numVision"> <input type="number" class="form-control" placeholder="100" aria-describedby="basic-addon2"> <span class="input-group-addon" id="basic-addon2">%</span> </div>';
  }
}
