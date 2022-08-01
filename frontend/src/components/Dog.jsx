import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Dog({ dog }) {
    const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGRvZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="dog profile image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dog.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/dogs/${dog._id}`)}>Profile</Button>
      </CardActions>
    </Card>
  );
}

export default Dog;