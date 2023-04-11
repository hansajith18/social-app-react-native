import Swal from "sweetalert2";

const initState = {
  Toast: Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  }),
};
const SweetAlertReducer = (state = initState, action) => {
  // console.log(state);
  return state;
};

export default SweetAlertReducer;
