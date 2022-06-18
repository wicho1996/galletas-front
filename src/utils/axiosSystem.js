import axios from './/axios';

const system = (ruta) => (fn, data) => {
    axios
      .get(ruta, data)
      .then(function (res) {
        // handle success
        fn(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
}

export default system;