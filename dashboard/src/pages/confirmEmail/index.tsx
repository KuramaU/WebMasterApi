import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Button } from "@mui/material";
import { useActions } from '../../hooks/useActions';

const EmailConfirmation: React.FC = () => {
    const [searchParams] = useSearchParams();
    const {message} = useTypedSelector((store) => store.UserReducer);
    const {ConfirmEmail} = useActions();
    
    const onConfirmEmail = (event: React.MouseEvent<unknown>) => {
      const confirmData ={
        Id: searchParams.get("userId"),
        Token: searchParams.get("token")
      };
      console.log("confirmData", confirmData);
      ConfirmEmail(confirmData);
    };
    return(<>
        <Grid sx={{width:"100%", display: "flex", mt: 3, flexDirection: "column", alignItems: "center"}}>
            <Typography component="h1" variant="h5" sx={{mt:2, m:"auto"}}>
                Do you want to confirm your email?
            </Typography>
            <Button 
                onClick={(event:any) => onConfirmEmail(event)} 
                variant="contained"
                size="large"
                sx={{mt:2}}
            >
                Confirm email
            </Button>
        </Grid>
    </>);
}
export default EmailConfirmation;