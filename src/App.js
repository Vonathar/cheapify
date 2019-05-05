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
    income: 25000,
    // Expenses
    foodExpenses: 100,
    transportationExpenses: 150,
    houseExpenses: 750,
    leisureExpenses: 50,
    beautyExpenses: 25,
    // Targets
    currentAge: 18,
    targetAge: 50,
    currentNet: 5000,
    targetNet: 250000,
    taxCountry: "United Kingdom",
    currencyIcon: "£",
    // Post-calculation values
    isTargetMet: "wait",
    /*
     3 options for isTargetMet: "yes" , "no" and "wait":
     yes => call to this.renderSummary() which renders a 'success' screen;
     no => call to this.renderSummary() which renders a 'failure' screen;
     wait => call to this.renderSummary() returns a blank statement, thus clearing the mid section of the screen;
     */
    isDaydreamActive: false,
    areTextInputsActive: false,
    // !!!!!!!!!!!!!!!!!!! CHANGE BACK TO FALSE !!!!!!!!!!!!!!!!!!!!!!
    isDetailedSummaryActive: false
  };

  // Change the state's isDaydreamActive according to user input
  handleDaydreamCheckbox = event => {
    this.setState({ isDaydreamActive: event.target.checked });
  };

  // Change the state's areTextInputsActive according to user input
  handleTextInputsCheckbox = event => {
    console.log("starting handleTextInputsCheckbox()");
    this.setState({ areTextInputsActive: event.target.checked });
  };

  // Change the state's isDetailedSummaryActive according to user input
  handleDetailedSummaryCheckbox = event => {
    console.log("starting handleDetailedSummaryCheckbox()");
    this.setState({ isDetailedSummaryActive: event.target.checked });
  };

  // Add text inputs to the 'expenses'
  handleTextInputsActivationExpenses = () => {
    let classes = "form-control form-control-sm expenses-textInput ";
    if (!this.state.areTextInputsActive) {
      classes += "noDisplay";
    }
    return classes;
  };

  // Add text inputs to the 'targets'
  handleTextInputsActivationTargets = () => {
    let classes = "form-control form-control-sm target-textInput ";
    if (!this.state.areTextInputsActive) {
      classes += "noDisplay";
    }
    return classes;
  };

  // Toggle opacity level from 0 to 1 ( fullOpacity -> expenses/target divs disappear)
  handleDetailedSummaryActivation = () => {
    return this.state.isDetailedSummaryActive ? "fullOpacity" : "noOpacity";
  };

  // Toggle the opacity level from 0 to 1 (fullOpacity -> detailed summary disappears)
  handleDetailedSummary = () => {
    return !this.state.isDetailedSummaryActive ? "fullOpacity" : "noOpacity";
  };

  // Fetch the user input for the yearly income and set the state
  handleIncomeInput = event => {
    console.log("starting handleIncomeInput()");
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
    return this.state.foodExpenses.toLocaleString();
  };
  handleTransportationExpensesText = () => {
    return this.state.transportationExpenses.toLocaleString();
  };
  handleHouseExpensesText = () => {
    return this.state.houseExpenses.toLocaleString();
  };
  handleLeisureExpensesText = () => {
    return this.state.leisureExpenses.toLocaleString();
  };
  handleBeautyExpensesText = () => {
    return this.state.beautyExpenses.toLocaleString();
  };

  /* Fetch & handle the values of the TARGETS */
  // Fetch the value of targets dynamically upon change
  handleTargetInput = event => {
    console.log("starting handleTargetInput()");
    if (event.target.id === "currentAgeInput") {
      this.setState({ currentAge: Number(event.target.value) });
    }
    if (event.target.id === "targetAgeInput") {
      this.setState({ targetAge: Number(event.target.value) });
    }
    if (event.target.id === "currentNetInput") {
      this.setState({ currentNet: Number(event.target.value) });
    }
    if (event.target.id === "targetNetInput") {
      this.setState({ targetNet: Number(event.target.value) });
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
    return this.state.targetNet.toLocaleString();
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

  // Set the state's currentIcon and taxCountry
  handleCountrySelection = event => {
    console.log("starting handleCountrySelection()");
    if (event.target.value == "United Kingdom") {
      this.setState({ currencyIcon: "£" });
    } else {
      this.setState({ currencyIcon: "€" });
    }
    this.setState({ taxCountry: event.target.value });
  };

  // Return the net salary once the country's taxes have been deducted
  calculateSalaryAfterTaxes = () => {
    // United Kingdom's taxes
    if (this.state.taxCountry == "United Kingdom") {
      // 0 - 12,500 => 0%
      if (this.state.income > 0 && this.state.income <= 12500) {
        return this.state.income;
      }
      // 12,501 - 50,000 => 20%
      if (this.state.income > 12500 && this.state.income <= 50000) {
        return this.state.income * 0.8;
      }
      // 50,001 - 150,000 => 40%
      if (this.state.income > 50000 && this.state.income <= 150000) {
        return this.state.income * 0.6;
      }
      // 150,001 or more => 45%
      if (this.state.income > 150000) {
        return this.state.income * 0.55;
      }
    }
    // Italy's taxes
    if (this.state.taxCountry == "Italy") {
      // 0 - 15,000 => 23%
      if (this.state.income > 0 && this.state.income <= 15000) {
        return this.state.income * 0.77;
      }
      // 15,001 - 28,000 => 27%
      if (this.state.income > 15000 && this.state.income <= 28000) {
        return this.state.income * 0.73;
      }
      // 28,001 - 55,000 => 38%
      if (this.state.income > 28000 && this.state.income <= 55000) {
        return this.state.income * 0.62;
      }
      // 55,001 - 75,000 => 41%
      if (this.state.income > 55000 && this.state.income <= 75000) {
        return this.state.income * 0.59;
      }
      // 75,001 or more => 43%
      if (this.state.income > 75000) {
        return this.state.income * 0.57;
      }
    }
    // No taxes
    if (this.state.taxCountry == "None (use net)") {
      return this.state.income;
    }
  };

  // Calculate the real yearly income, Salary (IN) - Expenses (OUT)
  calculateYearlyOverallIncome = () => {
    console.log("starting calculateYearlyOverallIncome()");

    let overallIncome =
      this.calculateSalaryAfterTaxes() - this.calculateYearlyExpenses();
    return overallIncome;
  };

  // Calculate the yearly savings (Income - Expenses)
  calculateYearlySavings = () => {
    return this.calculateYearlyOverallIncome();
  };

  // Calculate years to reach target
  calculateYearsToTarget = () => {
    if (this.calculateYearlyOverallIncome() < 1) {
      return 0;
    }
    return Math.floor(
      this.state.targetNet / this.calculateYearlyOverallIncome()
    );
  };

  // The money required to reach the target net worth, divided by the years left until target age
  calculateMinimumRequiredIncome = () => {
    console.log("starting calculateMinimumRequiredIncome()");
    let moneyToTarget = this.state.targetNet - this.state.currentNet;
    let yearsToTarget = this.state.targetAge - this.state.currentAge;
    // Return the yearly money necessary to reach the target
    return moneyToTarget / yearsToTarget;
  };

  // The yearly maximum spendable money which will still allow to reach the target age and meet the target net
  calculateYearlyMaxSpendToTarget = () => {
    return (
      this.calculateSalaryAfterTaxes() +
      this.state.currentNet / (this.state.targetAge - this.state.currentAge) -
      this.calculateMinimumRequiredIncome()
    );
  };

  // The yearly maximum spendable money which will still allow to reach the target age debt free
  calculateYearlyMaxSpendToNoDebt = () => {
    return (
      this.calculateSalaryAfterTaxes() +
      this.state.currentNet / (this.state.targetAge - this.state.currentAge)
    );
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

  // Calculate the net worth by the target age
  calculateNetByTargetAge = () => {
    let yearsToTarget = this.state.targetAge - this.state.currentAge;
    return this.calculateYearlyOverallIncome() * yearsToTarget;
  };

  // Calculate how long the target net worth would last according to the currently selected expenses

  calculateDurationOfTargetNet = () => {
    // If > 1 year
    if (this.state.targetNet / this.calculateYearlyExpenses() > 1) {
      return (
        Math.floor(this.state.targetNet / this.calculateYearlyExpenses()) +
        " years."
      );
      // If < 1 year
    } else if (this.state.targetNet / (this.calculateYearlyExpenses() / 12 > 1))
      return (
        Math.floor(
          this.state.targetNet / (this.calculateYearlyExpenses() / 12)
        ) + " months."
      );
  };

  // Calculate how long the current net worth would last according to the currently selected expenses

  calculateDurationOfCurrentNet = () => {
    // If > 1 year
    if (this.state.currentNet / this.calculateYearlyExpenses() > 1) {
      return (
        Math.floor(this.state.currentNet / this.calculateYearlyExpenses()) +
        " years."
      );
      // If < 1 year
    } else if (
      this.state.currentNet /
      (this.calculateYearlyExpenses() / 12 > 1)
    ) {
      return (
        Math.floor(
          this.state.currentNet / (this.calculateYearlyExpenses() / 12)
        ) + " months."
      );
    }
  };

  // The time it would take to become a millionaire by the current pace
  calculateTimeToMillionaire = () => {
    // If > 1 year
    if (1000000 / this.calculateYearlyOverallIncome() > 1) {
      return (
        Math.floor(1000000 / this.calculateYearlyOverallIncome()) + " years."
      );
      // If < 1 year
    } else if (1000000 / this.calculateYearlyOverallIncome() < 1) {
      return (
        Math.floor(1000000 / this.calculateYearlyOverallIncome()) + " months."
      );
    }
  };

  calculateSavingsByExpensesReduction = percentage => {
    return Math.floor(
      (this.calculateYearlySavings() / 100) * percentage
    ).toLocaleString();
  };

  /* 
    To make it easier to change the content of the individual paragraphs, each is rendered by its own unique method.
    Each method is only responsible for rendering a specific paragraph; the actuall calls to the methods are done by this.renderSummary()
  */

  // Return the first paragraph of the failure summary
  handleFailureParagraphOne = () => {
    return (
      <p>
        In your current situation, it will not be possible to reach your target
        net worth by your target age.
      </p>
    );
  };

  // Return the second paragraph of the failure summary
  handleFailureParagraphTwo = () => {
    // Render the net worth by target age
    if (this.calculateYearsToTarget() > 1) {
      return (
        <p>
          However, by your target age you will be worth
          <span className="text-success">
            <strong>
              {" "}
              {this.state.currencyIcon +
                this.calculateNetByTargetAge().toLocaleString()}
            </strong>
          </span>
          .
        </p>
      );
      // Render the amount of debt accumulated
    } else {
      return (
        <p>
          Keeping up this lifestyle, you by your target age you will have a debt
          of{" "}
          <span className="text-danger">
            <strong>
              {" "}
              {this.state.currencyIcon +
                Math.abs(
                  this.calculateNetByTargetAge().toString()
                ).toLocaleString()}
            </strong>
            .
          </span>
        </p>
      );
    }
  };

  // Return the third paragraph of the failure summary
  handleFailureParagraphThree = () => {
    // Render the age-related parameters
    if (this.calculateYearsToTarget() > 1) {
      return (
        <p>
          {" "}
          To earn{" "}
          <strong>
            {" "}
            {this.state.currencyIcon +
              Number(this.state.targetNet).toLocaleString()}
          </strong>{" "}
          it would take you
          <strong> {this.calculateYearsToTarget()}</strong> years, which means
          you will be
          <strong>
            {" "}
            {this.state.currentAge + this.calculateYearsToTarget()}
          </strong>
        </p>
      );
      // Skip the rendering of age-related parameters
    } else {
      return (
        <p>
          {" "}
          Sadly, according to the current data, it will never be possible to
          reach a net worth of{" "}
          <strong>
            {" "}
            {this.state.currencyIcon +
              Number(this.state.targetNet).toLocaleString()}
          </strong>
          .
        </p>
      );
    }
  };

  // Return the fourth paragraph of the failure summary
  handleFailureParagraphFour = () => {
    // Render the monthly expenses / yearly savings
    if (this.calculateYearsToTarget() > 1) {
      return (
        <p>
          Every month, the total of your expenses is{" "}
          <strong>
            {this.state.currencyIcon +
              (this.calculateYearlyExpenses() / 12).toLocaleString()}
          </strong>
          , which means you are left with{" "}
          <span className="text-success">
            <strong>
              {this.state.currencyIcon +
                Math.floor(
                  Math.abs(this.calculateYearlySavings() / 12)
                ).toLocaleString()}
            </strong>
          </span>{" "}
          of savings.
        </p>
      );
      // Render the monthly expenses and the amount of money spent per month which is causing the debt
    } else {
      return (
        <p>
          Every month, the total of your expenses is
          <strong>
            {" "}
            {this.state.currencyIcon +
              (this.calculateYearlyExpenses() / 12).toLocaleString()}
          </strong>
          , which means every month you are spending{" "}
          <span className="text-danger">
            <strong>
              {" "}
              {this.state.currencyIcon +
                Math.floor(
                  Math.abs(this.calculateYearlySavings() / 12)
                ).toLocaleString()}
            </strong>{" "}
          </span>
          more than you can afford!
        </p>
      );
    }
  };

  // Return the first paragraph of the success summary
  handleSuccessParagraphOne = () => {
    return (
      <p>
        In your current situation, you will be able to reach your target net
        worth by your target age!
      </p>
    );
  };

  // Return the second paragraph of the success summary
  handleSuccessParagraphTwo = () => {
    return (
      <p>
        By then, you will be worth
        <span className="text-success">
          <strong>
            {" "}
            {this.state.currencyIcon +
              Number(this.calculateNetByTargetAge()).toLocaleString()}
          </strong>
        </span>
        .
      </p>
    );
  };

  // Return the third paragraph of the success summary
  handleSuccessParagraphThree = () => {
    if (this.calculateYearsToTarget() > 1) {
      return (
        <p>
          To earn{" "}
          <strong>
            {" "}
            {this.state.currencyIcon + this.state.targetNet.toLocaleString()}
          </strong>{" "}
          it would take you
          <strong> {this.calculateYearsToTarget()} </strong>
          years, which means you will be
          <strong>
            {" "}
            {this.calculateYearsToTarget() + this.state.currentAge}
          </strong>
          .
        </p>
      );
    } else {
      return (
        <p>
          To earn{" "}
          <strong>
            {" "}
            {this.state.currencyIcon + this.state.targetNet.toLocaleString()}
          </strong>{" "}
          it would take you
          <strong> less than a year</strong>!
        </p>
      );
    }
  };

  // Return the fourth paragraph of the success summary
  handleSuccessParagraphFour = () => {
    return (
      <p>
        Every month, the total of your expenses is
        <strong>
          {" "}
          {this.state.currencyIcon +
            (this.calculateYearlyExpenses() / 12).toLocaleString()}
        </strong>
        , which means you are left with{" "}
        <span className="text-success">
          <strong>
            {this.state.currencyIcon +
              Math.floor(this.calculateYearlySavings() / 12).toLocaleString()}
          </strong>
        </span>{" "}
        of savings.
      </p>
    );
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
          {this.handleFailureParagraphOne()}
          {/* Net worth by target age */}
          {this.handleFailureParagraphTwo()}
          {/* Years to reach target net worth */}
          {this.handleFailureParagraphThree()}
          {/* Total of expenses */}
          {this.handleFailureParagraphFour()}
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
          {/* Failure or success paragraph */}
          {this.handleSuccessParagraphOne()}
          {/* Net worth by target age */}
          {this.handleSuccessParagraphTwo()}
          {/* Years to reach target worth */}
          {this.handleSuccessParagraphThree()}
          {/* Total of expenses */}
          {this.handleSuccessParagraphFour()}
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
          state={this.state}
          foodExpenses={this.foodExpenses}
          transportationExpenses={this.transportationExpenses}
          houseExpenses={this.houseExpenses}
          leisureExpenses={this.leisureExpenses}
          beautyExpenses={this.beautyExpenses}
          handleExpensesInput={this.handleExpensesInput}
          handleDetailedSummaryActivation={this.handleDetailedSummaryActivation}
          handleFoodExpensesText={this.handleFoodExpensesText}
          handleTextInputsActivationExpenses={
            this.handleTextInputsActivationExpenses
          }
          handleTransportationExpensesText={
            this.handleTransportationExpensesText
          }
          handleHouseExpensesText={this.handleHouseExpensesText}
          handleLeisureExpensesText={this.handleLeisureExpensesText}
          handleBeautyExpensesText={this.handleBeautyExpensesText}
        />
        <Income
          handleIncomeInput={this.handleIncomeInput}
          handleCountrySelection={this.handleCountrySelection}
          checkTargetMet={this.checkTargetMet}
          handleDaydreamCheckbox={this.handleDaydreamCheckbox}
          handleTextInputsCheckbox={this.handleTextInputsCheckbox}
          handleDetailedSummaryCheckbox={this.handleDetailedSummaryCheckbox}
        />
        <Summary
          renderSummary={this.renderSummary}
          handleDetailedSummary={this.handleDetailedSummary}
          state={this.state}
          calculateSalaryAfterTaxes={this.calculateSalaryAfterTaxes}
          calculateYearlyOverallIncome={this.calculateYearlyOverallIncome}
          calculateMinimumRequiredIncome={this.calculateMinimumRequiredIncome}
          calculateYearlyMaxSpendToTarget={this.calculateYearlyMaxSpendToTarget}
          calculateYearlyMaxSpendToNoDebt={this.calculateYearlyMaxSpendToNoDebt}
          calculateDurationOfTargetNet={this.calculateDurationOfTargetNet}
          calculateDurationOfCurrentNet={this.calculateDurationOfCurrentNet}
          calculateTimeToMillionaire={this.calculateTimeToMillionaire}
          calculateSavingsByExpensesReduction={
            this.calculateSavingsByExpensesReduction
          }
          calculateYearlySavings={this.calculateYearlySavings}
          calculateYearlyExpenses={this.calculateYearlyExpenses}
        />
        <Target
          state={this.state}
          targetNet={this.targetNet}
          handleTargetInput={this.handleTargetInput}
          handleTargetAgeText={this.handleTargetAgeText}
          handleTargetNetText={this.handleTargetNetText}
          handleTextInputsActivationTargets={
            this.handleTextInputsActivationTargets
          }
          handleDetailedSummaryActivation={this.handleDetailedSummaryActivation}
        />
      </div>
    );
  }
}

export default App;
