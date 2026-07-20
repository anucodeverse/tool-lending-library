import React from "react";


class ErrorBoundary extends React.Component {


  constructor(props){

    super(props);

    this.state={
      hasError:false
    };

  }




  static getDerivedStateFromError(){

    return {
      hasError:true
    };

  }





  componentDidCatch(error){

    console.error(
      "[Analytics] Application Error:",
      error
    );

  }





  render(){


    if(this.state.hasError){

      return (

        <div
          role="alert"
          style={{
            padding:"32px",
            textAlign:"center"
          }}
        >

          <h2>
            Something went wrong.
          </h2>


          <p>
            Please refresh the page.
          </p>


        </div>

      );

    }


    return this.props.children;


  }


}


export default ErrorBoundary;