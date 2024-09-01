const uploadBox = document.querySelector(".upload-box"),
      previewImg = uploadBox.querySelector("img"),
      fileInput = uploadBox.querySelector("input"),
      widthInput = document.querySelector(".width input"), 
      HeightInput =document.querySelector(".Height input"),
      ratioInput =document.querySelector(".ratio input"),
      downloadBtn = document.querySelector(".download-btn");
      qualityInput= document.querySelector(".quality input")

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>{
        widthInput.value = previewImg.naturalWidth;
        HeightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
       document.querySelector(".wrapper").classList.add("active");
    });
}
    //console.log(file);
widthInput.addEventListener("keyup" , () =>{
     //getting height acc to the ratio checkbox status
        const Height = ratioInput.checked ? widthInput.value / ogImageRatio: HeightInput.value;
        HeightInput.value = Math.floor(Height);
    });
    HeightInput.addEventListener("keyup" , () =>{
        //getting width acc to the ratio checkbox status
        const  width = ratioInput.checked ? HeightInput.value *  ogImageRatio: widthInput.value;
        widthInput.value = Math.floor(width);
    });

  const resizeAndDownload =()=>{
 const canvas = document.createElement("canvas")
 const a = document.createElement("a");
 const ctx =  canvas.getContext("2d");


  const imgQuality = qualityInput.checked ? 0.7 : 1.0;
 //setting canvas acc to h and w to the input values.,,,,
 canvas.width = widthInput.value;
 canvas.Height = HeightInput.value;
 //drawing user selected image onto the canvas
     ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.Height);

 //document.body.appendChild(canvas);
 a.href = canvas.toDataURL("image/jpeg" , imgQuality);
 a.download = new Date().getTime();
 a.click() //clicking <a> element to the file download
}
downloadBtn.addEventListener("click" ,resizeAndDownload);



fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
