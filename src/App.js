import React, { Component } from 'react'
import { Container, Row, Col, button} from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"
import Login from './Components/Forms/Login';

class App extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch('https://ec2-15-223-0-97.ca-central-1.compute.amazonaws.com:3000/crud')
        .then(response => response.json())
        .then(items => this.setState({items}))
        .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  saveToken(jsonToken) {
    sessionStorage.setItem("token", jsonToken);
  }

  handleClick() {
    sessionStorage.setItem("token", null);
    window.location.reload();
  }

  render() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken == null || userToken.token == null) {
      return <Login setToken={this.saveToken} message={userToken == null ? "" : userToken.message}/>
    }

    return (
        <Container className="App">
          <Row>
            <Col>
              <h3 style={{margin: "20px 0"}}>City Disaster Risk Reduction and Management Office | Inventory</h3>
            </Col>
            <Col>
              <h3 style={{"text-align": "right", margin: "20px 0"}}>
                <button onClick={this.handleClick}>
                  log out
                </button>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CSVLink
                  filename={"db.csv"}
                  color="primary"
                  style={{float: "left", marginRight: "10px"}}
                  className="btn btn-primary"
                  data={this.state.items}>
                Download CSV
              </CSVLink>
              <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default App