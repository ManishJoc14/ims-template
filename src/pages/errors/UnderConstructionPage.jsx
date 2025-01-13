import { Box, Button } from '@mui/material';
import PageImage from 'components/@extended/PageImage';
import { Link } from 'react-router-dom';
import UnderConstructionImage from '../../assets/images/error/constructionPage.svg';

const UnderConstructionPage = () => (
  <div style={{ textAlign: 'center' }}>
    <PageImage src={UnderConstructionImage} alt="Under construction page image" />
    <h1>Under Construction</h1>
    <p>Hey! Please check out this site page latewr. We are doing some maintenace on it right now</p>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" component={Link} to="/">
        Back Home
      </Button>
    </Box>
  </div>
);

export default UnderConstructionPage;
