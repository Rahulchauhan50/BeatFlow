import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { setAlert } from '../redux/features/playerSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
 
export default function DescriptionAlerts() {
    const { alert, Alertmessage } = useSelector((state) => state.player);
    const dispatch = useDispatch();


  React.useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
       dispatch(setAlert(false));
      }, 2000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [alert]);

  return (
    <div
      className={`transition-all duration-500 ${
        alert ? 'translate-y-0' : '-translate-y-40'
      } fixed top-10 left-0 right-0 z-[1000] md:hidden`}
    >
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert
        style={{borderRadius: "15px"}}
        className={`${Alertmessage==="User does not exist" || Alertmessage==="user already exist SignIn instead"?"bg-[#d44141] border-[#ff0000]":"bg-[#d7efd7] border-[#2dee37]"} w-[90%] md:w-[50%] m-auto h-[50px] border-2`}
          severity={Alertmessage==="User does not exist" || Alertmessage==="user already exist SignIn instead"?"error":"success"}
          onClose={() => setAlert(false)}
          sx={{ cursor: 'pointer' }}
        >
          <AlertTitle className={`${Alertmessage==="User does not exist" || Alertmessage==="user already exist SignIn instead"?"text-red-900":"text-green-900"}`} >{Alertmessage}</AlertTitle>
        </Alert>
      </Stack>
    </div>
  );
}
