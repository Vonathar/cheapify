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
    targetIncome: 55000,
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
     yes => this.renderSummary() renders a 'success' screen;
     no => this.renderSummary() renders a 'failure' screen;
     wait => this.renderSummary() returns a blank screen.
     */
    isDaydreamActive: false,
    areTextInputsActive: false,
    isDetailedSummaryActive: false,
    isSalaryIncreaseActive: false
  };

  // Input handler for isDaydreamActive (checkbox)
  handleDaydreamCheckbox = event => {
    this.setState({ isDaydreamActive: event.target.checked });
  };

  // Input handler for areTextInputsActive (checkbox)
  handleTextInputsCheckbox = event => {
    this.setState({ areTextInputsActive: event.target.checked });
  };

  // Input handler for isDetailedSummaryActive (checkbox)
  handleDetailedSummaryCheckbox = event => {
    this.setState({ isDetailedSummaryActive: event.target.checked });
  };

  // Input handler for isSalaryIncreaseActive (checkbox)
  handleSalaryIncreaseCheckbox = event => {
    this.setState({ isSalaryIncreaseActive: event.target.checked });
  };

  // Render the text inputs below expenses sliders
  handleTextInputsActivationExpenses = () => {
    let classes = "form-control form-control-sm expenses-textInput ";
    if (!this.state.areTextInputsActive) {
      classes += "noDisplay";
    }
    return classes;
  };

  // Render the text inputs below target sliders
  handleTextInputsActivationTargets = () => {
    let classes = "form-control form-control-sm target-textInput ";
    if (!this.state.areTextInputsActive) {
      classes += "noDisplay";
    }
    return classes;
  };

  // Toggle opacity from 0 to 1 ( fullOpacity -> Detailed Summary IS visible / Expenses and Targets are NOT visible)
  handleDetailedSummaryActivation = () => {
    return this.state.isDetailedSummaryActive ? "fullOpacity" : "noOpacity";
  };

  // Toggle opacity from 0 to 1 ( fullOpacity -> Detailed Summary is NOT visible / Expenses and Targets ARE visible  )
  handleDetailedSummaryDeactivation = () => {
    return !this.state.isDetailedSummaryActive ? "fullOpacity" : "noOpacity";
  };

  // Toggle opacity from 0 to 1 ( fullOpacity -> Detailed Summary IS visible )
  handleSalaryIncreaseActivation = () => {
    return !this.state.isSalaryIncreaseActive ? "fullOpacity" : "noOpacity";
  };

  // Input handler for this.state.income (text)
  handleIncomeInput = event => {
    this.setState({ income: Number(event.target.value) });
    // Update this.state.isTargetMet => rerender summary via this.renderSummary()
    this.checkTargetMet();
    // Clear the screen if isDaydreamActive is false
    if (!this.state.isDaydreamActive) {
      this.setState({ isTargetMet: "wait" });
    }
  };

  // Input handler for this.state.targetIncome (text)
  handleTargetIncomeInput = event => {
    this.setState({ targetIncome: Number(event.target.value) });
    // Update this.state.isTargetMet => rerender summary via this.renderSummary()
    this.checkTargetMet();
    // Clear the screen if isDaydreamActive is false
    if (!this.state.isDaydreamActive) {
      this.setState({ isTargetMet: "wait" });
    }
  };

  /* Fetch EXPENSES */
  // Input handler for expenses (text)
  handleExpensesInput = event => {
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
    // Update this.state.isTargetMet => rerender summary via this.renderSummary()
    this.checkTargetMet();
    // Clear the screen if isDaydreamActive is false
    if (!this.state.isDaydreamActive) {
      this.setState({ isTargetMet: "wait" });
    }
  };

  // Update UI (via child)
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

  /* Fetch TARGETS */
  // Input handler for targets (text)
  handleTargetInput = event => {
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
    // Update this.state.isTargetMet => rerender summary via this.renderSummary()
    this.checkTargetMet();
    // Clear the screen if isDaydreamActive is false
    if (!this.state.isDaydreamActive) {
      this.setState({ isTargetMet: "wait" });
    }
  };

  // Update UI (via child)
  handleTargetAgeText = () => {
    return this.state.targetAge;
  };
  handleTargetNetText = () => {
    return this.state.targetNet.toLocaleString();
  };

  // Expenses incurred in 12 months
  calculateYearlyExpenses = () => {
    let totalExpenses =
      (this.state.foodExpenses +
        this.state.transportationExpenses +
        this.state.houseExpenses +
        this.state.leisureExpenses +
        this.state.beautyExpenses) *
      12;

    return totalExpenses;
  };

  // Input handler for country (text)
  handleCountrySelection = event => {
    // Currency symbol
    if (event.target.value == "United Kingdom") {
      this.setState({ currencyIcon: "£" });
    } else {
      this.setState({ currencyIcon: "€" });
    }
    // Taxation country
    this.setState({ taxCountry: event.target.value });
  };

  // Median salary between current and target income
  calculateAverageSalaryAfterIncrease = () => {
    // Salary Increase is active
    if (this.state.isSalaryIncreaseActive) {
      return (this.state.income + this.state.targetIncome) / 2;
    }
    // Salary Increase is NOT active
    else {
      return this.state.income;
    }
  };

  // Return the net salary once the country's taxes have been deducted
  calculateSalaryAfterTaxes = () => {
    // United Kingdom
    if (this.state.taxCountry == "United Kingdom") {
      // 0 - 12,500 => 0%
      if (
        this.calculateAverageSalaryAfterIncrease() > 0 &&
        this.calculateAverageSalaryAfterIncrease() <= 12500
      ) {
        return this.calculateAverageSalaryAfterIncrease();
      }
      // 12,501 - 50,000 => 20%
      if (
        this.calculateAverageSalaryAfterIncrease() > 12500 &&
        this.calculateAverageSalaryAfterIncrease() <= 50000
      ) {
        return this.calculateAverageSalaryAfterIncrease() * 0.8;
      }
      // 50,001 - 150,000 => 40%
      if (
        this.calculateAverageSalaryAfterIncrease() > 50000 &&
        this.calculateAverageSalaryAfterIncrease() <= 150000
      ) {
        return this.calculateAverageSalaryAfterIncrease() * 0.6;
      }
      // 150,001 or more => 45%
      if (this.calculateAverageSalaryAfterIncrease() > 150000) {
        return this.calculateAverageSalaryAfterIncrease() * 0.55;
      }
    }
    // Italy
    if (this.state.taxCountry == "Italy") {
      // 0 - 15,000 => 23%
      if (
        this.calculateAverageSalaryAfterIncrease() > 0 &&
        this.calculateAverageSalaryAfterIncrease() <= 15000
      ) {
        return this.calculateAverageSalaryAfterIncrease() * 0.77;
      }
      // 15,001 - 28,000 => 27%
      if (
        this.calculateAverageSalaryAfterIncrease() > 15000 &&
        this.calculateAverageSalaryAfterIncrease() <= 28000
      ) {
        return this.calculateAverageSalaryAfterIncrease() * 0.73;
      }
      // 28,001 - 55,000 => 38%
      if (
        this.calculateAverageSalaryAfterIncrease() > 28000 &&
        this.calculateAverageSalaryAfterIncrease() <= 55000
      ) {
        return this.calculateAverageSalaryAfterIncrease() * 0.62;
      }
      // 55,001 - 75,000 => 41%
      if (
        this.calculateAverageSalaryAfterIncrease() > 55000 &&
        this.calculateAverageSalaryAfterIncrease() <= 75000
      ) {
        return this.calculateAverageSalaryAfterIncrease() * 0.59;
      }
      // 75,001 or more => 43%
      if (this.calculateAverageSalaryAfterIncrease() > 75000) {
        return this.calculateAverageSalaryAfterIncrease() * 0.57;
      }
    }
    // None
    if (this.state.taxCountry == "None (use net)") {
      return this.calculateAverageSalaryAfterIncrease();
    }
  };

  // Yearly left-over money after expenses are paid
  calculateYearlyOverallIncome = () => {
    return this.calculateSalaryAfterTaxes() - this.calculateYearlyExpenses();
  };

  // Years required to reach target with current salary
  calculateYearsToTarget = () => {
    if (this.calculateYearlyOverallIncome() < 1) {
      return 0;
    }
    return Math.floor(
      this.state.targetNet / this.calculateYearlyOverallIncome()
    );
  };

  // Minimum yearly salary to meet target requirements
  calculateMinimumRequiredIncome = () => {
    let moneyToTarget = this.state.targetNet - this.state.currentNet;
    let yearsToTarget = this.state.targetAge - this.state.currentAge;
    return moneyToTarget / yearsToTarget;
  };

  // Maximum spendable money (yearly) to meet target requirements
  calculateYearlyMaxSpendToTarget = () => {
    return (
      this.calculateSalaryAfterTaxes() +
      this.state.currentNet / (this.state.targetAge - this.state.currentAge) -
      this.calculateMinimumRequiredIncome()
    );
  };

  // Maximum spendable money (yearly) to be debt-free by target age
  calculateYearlyMaxSpendToNoDebt = () => {
    return (
      this.calculateSalaryAfterTaxes() +
      this.state.currentNet / (this.state.targetAge - this.state.currentAge)
    );
  };

  // Check if the target is met
  checkTargetMet = () => {
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

  // Net worth accumulated by target age
  calculateNetByTargetAge = () => {
    let yearsToTarget = this.state.targetAge - this.state.currentAge;
    return this.calculateYearlyOverallIncome() * yearsToTarget;
  };

  // Duration of target net worth based on current expenses
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

  // Duration of current net worth based on current expenses
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

  // Time left until millionaire
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
      (this.calculateYearlyOverallIncome() / 100) * percentage
    ).toLocaleString();
  };

  /* 
    To make it easier to change the content of the individual paragraphs, each is rendered by its own unique method.
    Each method is only responsible for rendering a specific paragraph; the actuall calls to the methods are done by this.renderSummary()
  */

  // Failure - Paragraph 1
  handleFailureParagraphOne = () => {
    return (
      <p>
        In your current situation, it will not be possible to reach your target
        net worth by your target age.
      </p>
    );
  };

  // Failure - Paragraph 2
  handleFailureParagraphTwo = () => {
    // Net worth by target age
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
      // Amount of debt accumulated
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

  // Failure - Paragraph 3
  handleFailureParagraphThree = () => {
    // Age-related parameters
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
      // SKIP age-related parameters
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

  // Failure - Paragraph 4
  handleFailureParagraphFour = () => {
    // Monthly expenses / yearly savings
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
                  Math.abs(this.calculateYearlyOverallIncome() / 12)
                ).toLocaleString()}
            </strong>
          </span>{" "}
          of savings.
        </p>
      );
      // Monthly expenses / debt accumulation
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
                  Math.abs(this.calculateYearlyOverallIncome() / 12)
                ).toLocaleString()}
            </strong>{" "}
          </span>
          more than you can afford!
        </p>
      );
    }
  };

  // Success - Paragraph 1
  handleSuccessParagraphOne = () => {
    return (
      <p>
        In your current situation, you will be able to reach your target net
        worth by your target age!
      </p>
    );
  };

  // Success - Paragraph 2
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

  // Success - Paragraph 3
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

  // Success - Paragraph 4
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
              Math.floor(
                this.calculateYearlyOverallIncome() / 12
              ).toLocaleString()}
          </strong>
        </span>{" "}
        of savings.
      </p>
    );
  };

  renderSummary = () => {
    // Empty div (Daydream NOT active)
    if (this.state.isTargetMet === "wait") {
      return;
    }
    // Summary div (Target NOT met)
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
          {/* Total expenses */}
          {this.handleFailureParagraphFour()}
          <small className="text-muted">
            Try playing around with the expenses to see how they affect your
            future net worth.
          </small>
        </React.Fragment>
      );
    }
    // Summary div (Target MET)
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
          handleTargetIncomeInput={this.handleTargetIncomeInput}
          handleCountrySelection={this.handleCountrySelection}
          checkTargetMet={this.checkTargetMet}
          handleDaydreamCheckbox={this.handleDaydreamCheckbox}
          handleTextInputsCheckbox={this.handleTextInputsCheckbox}
          handleDetailedSummaryCheckbox={this.handleDetailedSummaryCheckbox}
          handleSalaryIncreaseCheckbox={this.handleSalaryIncreaseCheckbox}
          handleSalaryIncreaseActivation={this.handleSalaryIncreaseActivation}
        />
        <Summary
          renderSummary={this.renderSummary}
          handleDetailedSummaryDeactivation={
            this.handleDetailedSummaryDeactivation
          }
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
          calculateYearlyOverallIncome={this.calculateYearlyOverallIncome}
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
