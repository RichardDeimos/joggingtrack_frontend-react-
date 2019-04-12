import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getRecordData, postRecord, updateRecord, deleteRecord } from '../actions/recordActions';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  mainContainer: {
  	margin: 100
  },
  greatPosition:{
    float:'right'
  },
  greatpagePosition:{
    marginRight: '3%',
    float:'right',
    fontSize:18
  },
  greatpagePositionRight:{
    marginRight: '5%',
    float:'right',
    fontSize:18
  },
  greatpagePositionLeft:{
    marginRight: '3%',
    float:'right',
    fontSize:18
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  modalbutton:{
    marginLeft: 100,
    paddingBottom: 10,
    paddingTop: 10,
    background: '#dfdfdf'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	from: "",
    	to: "",
      open: false,
      page: 1,
      page_size: 5,
      edit_record_id: 0,
      edit_distance: 0,
      edit_time: 0,
      edit_date: ""
    };
  }

  componentDidMount(){
    const{ from, to, page, page_size } = this.state
    const data = {
      from: from,
      to: to,
      page : page,
      page_size: page_size  
    }
    this.props.getRecordData(data);
  }

  handleFromChange = (event) => {
  	let from = event.currentTarget.value
    const {page, page_size} = this.state;
    const {to} = this.state;
    this.setState({from})
    const data = {
      from: from,
      to: to,
      page : page,
      page_size: page_size  
    }
    this.props.getRecordData(data);
  }
  handleOpen = () => {
    this.setState({ open: true, edit_record_id: 0 });
  };

  handleEdit = (row) => () => {
     this.setState({ 
       open: true,
       edit_record_id: row.id,
       edit_distance: row.distance,
       edit_time: row.time,
       edit_date: row.date });
  }

  handleDelete = (id) => () => {
    const data = {
      id: id
    } 
    this.props.deleteRecord(data);
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleToChange =   (event) => {
    const {page, page_size} = this.state;
  	this.setState({to: event.currentTarget.value})
 	  const from = this.state.from, to = event.currentTarget.value
 		const data = {
      from: from,
      to: to,
      page : page,
      page_size: page_size  
    }
    this.props.getRecordData(data);
  }
  onHandleRecord = (event) => {
    event.preventDefault();
    this.setState({ open: false });
    const { edit_record_id } = this.state;
    const { me } = this.props;
    let time = event.target.time.value;
    let distance = event.target.distance.value;
    let date = event.target.date.value;

    if( edit_record_id === 0 )
    {
      const data = {
        time: time,
        date: date,
        distance: distance,
        user_id: me.id,
      } 
      this.props.postRecord(data);
    }
    else
    {
      const data = {
        time: time,
        date: date,
        distance: distance,
        user_id: me.id,
        id: edit_record_id
      } 
      this.props.updateRecord(data);

    }
  }

  handleBefore = (event) => {
    const {from, to, page_size, page} = this.state;
    let current_page = page - 1;
    this.setState({page: current_page})
    const data = {
      from: from,
      to: to,
      page : current_page,
      page_size: page_size  
    }
    this.props.getRecordData(data);
  };
  handleNextpage = (event) => {
    const {from, page, to, page_size} = this.state;
    let current_page = page + 1;
    this.setState({page:current_page})
    const data = {
      from: from,
      to: to,
      page : current_page,
      page_size: page_size  
    }
    this.props.getRecordData(data);
  };

  handleChangeRowsPerPage = (event, page_size) => {
    alert(page_size)
  }

  render() {
  	const { classes, records, pages  } = this.props;
    const { page, page_size, edit_record_id, edit_distance, edit_time, edit_date } = this.state;
    const pagecount = pages.count;

    return (
      <div className={classes.mainContainer}>
      	<h2> Jogging-tracker Record </h2>

	      <TextField
	        id="date"
	        label="From"
	        type="date"
	        onChange={this.handleFromChange}
	        defaultValue=""
	        className={classes.textField}
	        InputLabelProps={{
	          shrink: true,
	        }}
        />
	      <TextField
	        id="date"
	        label="To"
	        type="date"
	        onChange={(event) => this.handleToChange(event)}
	        defaultValue=""
	        className={classes.textField}
	        InputLabelProps={{
	          shrink: true,
	        }}
        />
          <span>
            <Button className={classes.modalbutton} onClick={this.handleOpen}>New Record</Button>
            <Modal aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}>
              <div style={getModalStyle()} className={classes.paper}>
                <form className={classes.form} onSubmit={this.onHandleRecord}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="distance">Distance</InputLabel>
                    <Input type="number" defaultValue={edit_record_id?edit_distance:""} id="distance" name="distance" autoComplete="distance" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="time">Time</InputLabel>
                    <Input name="time" type="number" defaultValue={edit_record_id?edit_time:""} id="time" autoComplete="time" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="date">Date</InputLabel>
                    <Input name="date" type="date" defaultValue={edit_record_id?edit_date:""} id="date" autoComplete="time" />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Save
                  </Button>
                </form>
              </div>
            </Modal>
          </span>

           <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"> No </TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Distance</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row, index )=> (
                  <TableRow key={row.id}>
                    <TableCell align="center" component="th" scope="row">
                      {index + page_size * (page - 1) + 1}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.distance}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">
                      <Fab size="small" onClick={this.handleEdit(row)} color="secondary" aria-label="Edit" className={classes.fab}>
                        <EditIcon />
                      </Fab>
                      <Fab size="small" onClick={this.handleDelete(row.id)} aria-label="Delete" className={classes.fab}>
                        <DeleteIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <IconButton
              className={classes.greatpagePositionRight}
              onClick={this.handleNextpage}
              disabled={page * page_size >= pagecount}
              aria-label="Next Page"
            >
              <KeyboardArrowRight />
            </IconButton>
            
             <IconButton
              className={classes.greatpagePosition}
            >
              {page}
            </IconButton>           

            <IconButton
              className={classes.greatpagePositionLeft}
              onClick={this.handleBefore}
              disabled={page === 1}
              aria-label="Previous Page"
            >
               <KeyboardArrowLeft />
            </IconButton>
          </Paper>

      </div>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  me: state.auth.me,
  role: state.auth.role,
  records: state.record.records,
  pages: state.record.page
});

const mapDispatchToProps = {
  getRecordData,
  postRecord,
  updateRecord,
  deleteRecord
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardPage));

