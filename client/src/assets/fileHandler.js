export function encodeImageFileAsURL(element) {
  var file = element.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    return reader.result;
  };
}

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

//   handleFileInputChange = (e) => {
//     let { file } = this.state;

//     file = e.target.files[0];

//     getBase64(file)
//       .then((result) => {
//         file["base64"] = result;
//         this.setState({
//           base64URL: result,
//           file,
//         });
//         console.log("RESULT", result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     this.setState({
//       file: e.target.files[0],
//       mediaType: e.target.files[0].type,
//     });
//   };
