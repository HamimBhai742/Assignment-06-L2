import Lottie from 'lottie-react';
import loding from '../../assets/lottieFiles/loding.json';
export default function Loding() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Lottie
        animationData={loding}
        style={{ width: '60%', height: '60%' }}
        loop={true}
        autoPlay={true}
      />
      ;
    </div>
  );
}
