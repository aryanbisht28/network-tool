// material-ui
import { useTheme } from '@mui/material/styles';
import Klogo from '../assets/images/KPMG.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
                src={Klogo}
                alt="kpmg-logo"
                style={{
                    width: '9vw',
                    height: '10vh',
                    position: 'relative',
                    bottom: '0.6em'
                }}
            ></img>
            {/* <h1 style={{ viewBox: '0 0 92 32', fontSize: '0.9em', textAlign: 'center' }}> Roaming Assurance</h1> */}
        </div>
    );
};

export default Logo;
