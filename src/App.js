import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Card,Image,Container,Row,Col  } from 'react-bootstrap';
import './App.css';
import React , { useState, Component } from 'react';

const Header = ({callfunction,toggleList,searchRandom}) =>{

  const enterController = (e) => {
    e.preventDefault();
  }

 
  const [searchType,changeSearchType] = useState("name");
  const [text,changeText] = useState("name");
  let pltext = `Search by ${searchType}`;

  const startSearch = () => {
    console.log("anan");
  }

  return(
    <div className="navbardiv">
      <Navbar bg="none" expand="lg">
        <Navbar.Brand className="Appname" href="" onClick = {toggleList}>The Mixologist</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick ={searchRandom}>Surprise me</Nav.Link>
            <NavDropdown title="Search option" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeSearchType("name")}>Search by name</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeSearchType("ingredient")}>Search by ingredient</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeSearchType("glass")}>Search by glass</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Search non-alcoholic drinks</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form onSubmit={enterController} inline>
            <FormControl onChange={(e)=> {changeText(e.target.value)}} type="text" placeholder= {pltext} className="mr-sm-2" />
            <Button onClick={() => callfunction(text,searchType)} variant="outline-info">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const NameBody = ({name,image,ingredients,instructions}) => {
  

  //getData();

  return (
    <div className="vertical-center">
        <Row>
          <Col xs={12} md={6}>
            <Image className="w-75" src={image} rounded />
          </Col>
          <Col xs={12} md={6}>
            <Row className = "justify-content-start">
              <h1 className= "drinktitle">{name}</h1>
            </Row>
            <Row className = "justify-content-end">
              <h3 className="cocktail">Cocktail</h3>
            </Row>
            <hr></hr>
            <Row className="topmargin">
              <Col xs={12} md={6}>
                <h3>Ingredients</h3>
                <div className="mt-4" variant = "flush">{ingredients.map((ingredient,index) => <p key={index} >{ingredient}</p>)}</div>
              </Col>
              <Col xs={12} md={6}>
                <h3>Instructions</h3>
                <div className="mt-4" variant = "flush">{instructions.map((instruction,index) => {
                  if(index > 7)
                    return null
                  else {
                    return <p key={index} >{instruction}</p>
                  }
                })}</div>
              </Col>
            </Row>
          </Col>
        </Row>
    </div>
  );
}

const ListBody = ({list,details}) => {
  return(
    <div className="listbody my-5">
        <Row> 
            {list.map((prop,index) => {
             return (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="mb-5" style={{ width: '20rem' }}>
                  <Card.Img variant="top" src={prop.strDrinkThumb} />
                  <Card.Body>
                    <Card.Title className="cardTitle">{prop.strDrink}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>
                    <p className="recipebutton" variant="link" onClick = {() => details(prop.idDrink)}>See recipe</p>
                  </Card.Body>
                </Card>
              </Col>
             );
            })}
        </Row>
    </div>
  );
}

function App() {

  const[showList,changeShowList] = useState(false);
  const [search,changeSearch] = useState();
  const [name,changeName] = useState();
  const [image,changeImage] = useState();
  const [ingredients,changeIngredients] = useState([]);
  const [instructions,changeInstructions] = useState([]);
  const [drinklist,changeDrinklist] = useState([]);

  React.useEffect(() => {
    getRandom();
  }, []);
  
  const getRandom = () => {
    console.log("random");
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then((jsonData) => {
      // jsonData is parsed json object received from url
      console.log(jsonData);
      assignData(jsonData);
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
    changeShowList(false);
  }

  const fetchIDData = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData);
        console.log(id);
        assignData(jsonData);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }


  const getData = (text,type) => {
    console.log("asdasdasdasdasd");
    console.log(text,type);
    if(type == "name"){
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`)
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData);
        assignData(jsonData);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
    }
    else if (type == "ingredient"){
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`)
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData);
        assignList(jsonData);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
    }
    else{
      let glasstype = ""; 
      switch(text){
        case "champagne" : glasstype = "flute"; break;
        case "brandy" : glasstype = "snifter"; break; 
        case "coffee" : glasstype = "mug";break;
        default : glasstype = "glass";
      }
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${text}_${glasstype}`)
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData);
        assignList(jsonData);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
    }
  }

  const assignList = (jsonData) => {
    console.log(drinklist);
    let y = [];
    if(jsonData.drinks.length > 20){
      for(var i= 0; i < 20; i++){
        y.push(jsonData.drinks[i])
        console.log(y);
      }
    }
    else{
      for(var i= 0; i < jsonData.drinks.length; i++){
        y.push(jsonData.drinks[i])
        console.log(y);
      }
    }
    changeDrinklist(y);
    console.log(drinklist);
    console.log(y);
    changeShowList(true);
  }

  const assignData = (jsonData) => {
    changeName(jsonData.drinks[0].strDrink);
    changeImage(jsonData.drinks[0].strDrinkThumb);
    changeInstructions(jsonData.drinks[0].strInstructions.split("."));
    console.log(image);
    let y = [];
    for(var ing in jsonData.drinks[0]){
      if(ing.includes("strIngredient")){
        if(jsonData.drinks[0][ing] != null){
          console.log(jsonData.drinks[0][ing]);
          y.push(jsonData.drinks[0][ing]);
        }
      }
    }
    changeIngredients(y);
    changeShowList(false);
  }

  return (
    <div className="App">
      <Header searchRandom = {() => getRandom()} toggleList = {() => changeShowList(false)} callfunction={getData} />
      {showList === false ?<NameBody 
        name = {name}
        image = {image}
        ingredients = {ingredients}
        instructions = {instructions}
        /> : <ListBody details = {fetchIDData} list= {drinklist}></ListBody> }
    </div>
  );
}

export default App;
