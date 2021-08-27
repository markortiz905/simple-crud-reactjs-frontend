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
    fetch('http://ec2-34-222-149-71.us-west-2.compute.amazonaws.com:3000/crud')
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
    this.getItems();

    const now = Date.now();
    const count = this.state.items.filter(value => {
      const expired = Date.parse(value.expirationDate) < now;
      if (expired) {
        return true;
      }
      return false;
    });

    console.log("count: " + this.state.items.length)
    this.setState({expiredItemsCount: count.length})
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
              <h3 style={{margin: "20px 0"}}>DORSU DISASTER INVENTORY M.S.</h3>
            </Col>
            <Col col={{"width":"100px"}}>
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
              <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default App
