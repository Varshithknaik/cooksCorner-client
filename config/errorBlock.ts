import toast from "react-hot-toast";

export const errorBlock = (error: any) => {
  if( 'data' in error){
    toast.error((error.data as any).message);
  }else {
    toast.error('Network Unavailable');
  }
}