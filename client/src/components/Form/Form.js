import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost  } from '../../actions/posts';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Form  = ({ currentId, setCurrentId }) => {
	console.log(currentId)
	const [ postData, setPostData ] = useState({ title: '', message: ''}); 
	const post = useSelector((state) => (currentId ? state.posts.posts.find((t) => t._id == currentId) : null));
	const dispatch = useDispatch();
	const classes = useStyles();

	const user = JSON.parse(localStorage.getItem('profile'));
	console.log("user###",user)

	useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '' });
  };

	const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

   if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
        	Please Sign In to create your own posts!!!
        </Typography>
      </Paper>
    );
  }

  const postTitle = capitalizeFirstLetter(postData.title)
  
	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
			
			<Typography variant="h6">
			  {currentId ? `Editing "${postTitle}"` : 'Create a Post'}
			</Typography>

				<TextField name="creator"
				 variant="outlined" 
				 label="Creator" 
				 fullWidth 
				 value={postData.creator}
				 onChange={(e) => setPostData({ ...postData, creator: e.target.value })} 
				/>
				<TextField name="title"
				 variant="outlined" 
				 label="Title" 
				 fullWidth 
				 value={postData.title}
				 onChange={(e) => setPostData({ ...postData, title: e.target.value})}
				/>
				<TextField name="message"
				 variant="outlined" 
				 label="Message" 
				 fullWidth 
				 value={postData.message}
				 onChange={(e) => setPostData({ ...postData, message: e.target.value})}
				/>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
			</form>
		</Paper>
	)
}

export default Form;