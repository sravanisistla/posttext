import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import { getPost } from '../../actions/posts';

function useQuery() {
  let pageInfo;

  let url = window.location.href
  let urlPage = url.split('?');
  
  if(urlPage[1]){
    let pageUrl = urlPage[1]
    pageUrl.includes('page')
    if(pageUrl){
      let finalst = pageUrl.split('=');
      if(finalst[0] == 'page'){
        pageInfo = finalst[1]  
      }
    }
  }
  return pageInfo
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query || 1;

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);


  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;