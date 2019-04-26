import React, { Component } from "react";
import Navbar from "./components/navbar";
import Income from "./components/income";
import Expenses from "./components/expenses";
import Target from "./components/target";
import Summary from "./components/summary";

import failureLogo from "./img/failure.png";
import successLogo from "./img/success.png";

class App extends Component {
  state = {
    // User input
    income: 12000,
    // Expenses
    foodExpenses: 500,
    transportationExpenses: 500,
    houseExpenses: 2500,
    leisureExpenses: 500,
    beautyExpenses: 500,
    // Targets
    currentAge: 18,
    targetAge: 50,
    currentNet: 5000,
    targetNet: 1000000,
    // Post-calculation values
    isTargetMet: "wait",
    /*
     3 options for isTargetMet: "yes" , "no" and "wait":
     yes => call to this.renderSummary() which renders a 'success' screen;
     no => call to this.renderSummary() which renders a 'failure' screen;
     wait => call to this.renderSummary() returns a blank statement, thus clearing the mid section of the screen;
     */
    isDaydreamActive: false
  };

  // Change the state's isDaydreamActive according to user input
  handleDaydreamCheckbox = event => {
    this.setState({ isDaydreamActive: event.target.checked });
  };
  // Fetch the user input for the yearly income and set the state
  handleIncomeInput = event => {
    console.log("starting handleIncomeInput()");
    console.log(event.target.value);
    this.setState({ income: event.target.value });
    // Change the state of isTargetMet, causing a rerender of the summary via this.renderSummary()
    this.checkTargetMet();
    // Clear the screen unless isDaydreamActive === true
    if (!this.state.isDaydreamActive) {
      this.setState({ isTargetMet: "wait" });
    }
  };
  /* Fetch & handle the values of the EXPENSES */
  // Fetch the value of expenses dynamically upon change
  handleExpensesInput = event => {
    console.log("starting handleExpenseInput()");
    console.log(event.target.value);
    if (event.target.id === "foodExpenses") {
      this.setState({ foodExpenses: Number(event.target.value) });
    }
    if (event.target.id === "transportationExpenses") {
      this.setState({ transportationExpenses: Number(event.target.value) });
    }
    if (event.target.id === "houseExpenses") {
      this.setState({ houseExpenses: Number(event.target.value) });
    }
    if (event.target.id === "leisureExpenses") {
      this.setState({ leisureExpenses: Number(event.target.value) });
    }
    if (event.target.id === "beautyExpenses") {
      this.setState({ beautyExpenses: Number(event.target.value) });
    }
    // Change the state of isTargetMet, causing a rerender of the summary via this.renderSummary()
    this.checkTargetMet();
    // Clear the screen unless isDaydreamActive === true
    if (!this.state.isDaydreamActive) {
      this.setState({ isTargetMet: "wait" });
    }
  };

  // Handler functions to update the UI with the new values of the various expenses
  handleFoodExpensesText = () => {
    return this.state.foodExpenses;
  };
  handleTransportationExpensesText = () => {
    return this.state.transportationExpenses;
  };
  handleHouseExpensesText = () => {
    return this.state.houseExpenses;
  };
  handleLeisureExpensesText = () => {
    return this.state.leisureExpenses;
  };
  handleBeautyExpensesText = () => {
    return this.state.beautyExpenses;
  };

  /* Fetch & handle the values of the TARGETS */
  // Fetch the value of targets dynamically upon change
  handleTargetInput = event => {
    console.log("starting handleTargetInput()");
    console.log(event.target.value);
    if (event.target.id === "currentAgeInput") {
      this.setState({ currentAge: event.target.value });
    }
    if (event.target.id === "targetAgeInput") {
      this.setState({ targetAge: event.target.value });
    }
    if (event.target.id === "currentNetInput") {
      this.setState({ currentNet: event.target.value });
    }
    if (event.target.id === "targetNetInput") {
      this.setState({ targetNet: event.target.value });
    }
    // Change the state of isTargetMet, causing a rerender of the summary via this.renderSummary()
    this.checkTargetMet();
    // Clear the screen unless isDaydreamActive === true
    if (!this.state.isDaydreamActive) {
      this.setState({ isTargetMet: "wait" });
    }
  };

  // Handler functions to update the UI with the new values of the various targets
  handleTargetAgeText = () => {
    return this.state.targetAge;
  };
  handleTargetNetText = () => {
    return this.state.targetNet;
  };

  // All the expenses summed (YEARLY)
  calculateYearlyExpenses = () => {
    console.log("starting calculateYearlyExpenses()");
    let totalExpenses =
      (this.state.foodExpenses +
        this.state.transportationExpenses +
        this.state.houseExpenses +
        this.state.leisureExpenses +
        this.state.beautyExpenses) *
      12;

    return totalExpenses;
  };

  // Calculate the real yearly income, Salary (IN) - Expenses (OUT)
  calculateYearlyOverallIncome = () => {
    console.log("starting calculateYearlyOverallIncome()");

    let overallIncome = this.state.income - this.calculateYearlyExpenses();
    return overallIncome;
  };

  // Calculate years to reach target
  calculateYearsToTarget = () => {
    return Math.floor(
      this.state.targetNet / this.calculateYearlyOverallIncome()
    );
  };

  // The money required to reach the target net worth, divided by the years left until target age
  calculateMinimumRequiredIncome = () => {
    console.log("starting calculateMinimumRequiredIncome()");
    let moneyToTarget = this.state.targetNet - this.state.currentNet;
    let yearsToTarget = this.state.targetAge - this.state.currentAge;
    // RhandleDaydreamCheckboxeturn the yearly money necessary to reach the target
    return moneyToTarget / yearsToTarget;
  };

  // Check the money made in a year is more than the minimum required to meet target
  checkTargetMet = () => {
    console.log("starting checkTargetMet()");
    // Yearly target > yearly money IN
    if (
      this.calculateYearlyOverallIncome() <
      this.calculateMinimumRequiredIncome()
    ) {
      this.setState({ isTargetMet: "no" });
      // Yearly money IN > yearly target
    } else if (
      this.calculateYearlyOverallIncome() >=
      this.calculateMinimumRequiredIncome()
    ) {
      this.setState({ isTargetMet: "yes" });
    }
  };

  calculateNetByTargetAge = () => {
    let yearsToTarget = this.state.targetAge - this.state.currentAge;
    return this.calculateYearlyOverallIncome() * yearsToTarget;
  };

  renderSummary = () => {
    // Render an empty div, only available if isDaydreamActive === false
    if (this.state.isTargetMet === "wait") {
      return;
    }
    // Render the summary div based on the TARGET NOT being MET
    if (this.state.isTargetMet === "no") {
      return (
        <React.Fragment>
          <img src={failureLogo} alt="failure logo" className="resultImage" />
          {/* Fail or success paragraph */}
          <p>
            In your current situation, it will not be possible to reach your
            target net worth by your target age.
          </p>
          {/* Net worth by target age */}
          <p>
            However, by your target age you will be worth
            <strong> £{this.calculateNetByTargetAge()}</strong>.
          </p>
          {/* Years to reach target net worth */}
          <p>
            To earn <strong> £{this.state.targetNet}</strong> it would take you
            <strong> {this.calculateYearsToTarget()}</strong> years, which means
            you will be
            <strong>
              {" "}
              {this.state.currentAge + this.calculateYearsToTarget()}
            </strong>
            .
          </p>
          {/* Total of expenses */}
          <p>
            Every month, the total of your expenses is
            <strong> £{this.calculateYearlyExpenses() / 12}</strong>.
          </p>
          <small className="text-muted">
            Try playing around with the expenses to see how they affect your
            future net worth.
          </small>
        </React.Fragment>
      );
    }
    // Render the summary div based on the TARGET being MET
    if (this.state.isTargetMet === "yes") {
      return (
        <React.Fragment>
          <img src={successLogo} alt="success logo" className="resultImage" />
          <p>
            In your current situation, you will be able to reach your target net
            worth by your target age!
          </p>
          <p>
            By then, you will be worth
            <strong> £{this.calculateNetByTargetAge()}</strong>.
          </p>
          <p>
            To earn <strong> £{this.state.targetNet}</strong> it would take you
            <strong> {this.calculateYearsToTarget()} </strong>
            years, which means you will be
            <strong>
              {" "}
              {this.calculateYearsToTarget() + this.state.currentAge}
            </strong>
            .
          </p>
          <p>
            Every month, the total of your expenses is
            <strong> {this.calculateYearlyExpenses() / 12}</strong>.
          </p>
          <small className="text-muted">
            Try playing around with the expenses to see how can they affect your
            future net worth.
          </small>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Expenses
          foodExpenses={this.foodExpenses}
          transportationExpenses={this.transportationExpenses}
          houseExpenses={this.houseExpenses}
          leisureExpenses={this.leisureExpenses}
          beautyExpenses={this.beautyExpenses}
          handleExpensesInput={this.handleExpensesInput}
          handleFoodExpensesText={this.handleFoodExpensesText}
          handleTransportationExpensesText={
            this.handleTransportationExpensesText
          }
          handleHouseExpensesText={this.handleHouseExpensesText}
          handleLeisureExpensesText={this.handleLeisureExpensesText}
          handleBeautyExpensesText={this.handleBeautyExpensesText}
        />
        <Income
          handleIncomeInput={this.handleIncomeInput}
          checkTargetMet={this.checkTargetMet}
          handleDaydreamCheckbox={this.handleDaydreamCheckbox}
        />
        <Summary renderSummary={this.renderSummary} />
        <Target
          targetNet={this.targetNet}
          handleTargetInput={this.handleTargetInput}
          handleTargetAgeText={this.handleTargetAgeText}
          handleTargetNetText={this.handleTargetNetText}
        />
      </div>
    );
  }
}

export default App;
