import React, { Component } from "react";
import incomeLogo from "../img/summary-income.png";
import targetLogo from "../img/summary-target.png";
import expensesLogo from "../img/summary-expenses.png";
import otherLogo from "../img/summary-other.png";

class Summary extends Component {
  // Handlers for Monthly Income - BE
  handleMonthlyIncomeGross = () => {
    if (this.props.calculateSalaryAfterTaxes() / 12 >= 1) {
      return Math.floor(
        this.props.calculateSalaryAfterTaxes() / 12
      ).toLocaleString();
    } else {
      return (this.props.calculateSalaryAfterTaxes() / 12).toFixed(2);
    }
  };

  // Handlers for the Daily Income - BE
  handleDailyIncomeGross = () => {
    return (this.props.calculateSalaryAfterTaxes() / 365).toFixed(2);
  };

  // Handlers for the Monthly Income - AE
  handleMonthlyIncomeNet = () => {
    if (this.props.calculateSalaryAfterTaxes() / 12 >= 1) {
      return Math.floor(
        this.props.calculateYearlyOverallIncome() / 12
      ).toLocaleString();
    } else {
      return (this.props.calculateYearlyOverallIncome() / 12)
        .toFixed(2)
        .toLocaleString();
    }
  };

  handleMonthlyIncomeNetBadge = () => {
    if (this.handleMonthlyIncomeNet() <= 0) {
      return "text-danger";
    } else {
      return "text-success";
    }
  };

  // Handlers for the Daily Income - AE
  handleDailyIncomeNet = () => {
    return (this.props.calculateYearlyOverallIncome() / 365)
      .toFixed(2)
      .toLocaleString();
  };

  handleDailyIncomeNetBadge = () => {
    if (this.handleDailyIncomeNet() <= 0) {
      return "text-danger";
    } else {
      return "text-success";
    }
  };

  // Impact of current net on target net
  handleImpactOnNet = () => {
    return (
      this.props.state.currentNet *
      (100 / this.props.state.targetNet)
    ).toFixed(2);
  };

  // Minimum net salary to reach target
  handleMinimumNetToTarget = () => {
    return (
      this.props.state.targetNet /
      (this.props.state.targetAge - this.props.state.currentAge)
    ).toLocaleString();
  };

  // Surplus money after target reached
  handleSurplusAfterTarget = () => {
    return (
      (this.props.calculateYearlyOverallIncome() -
        this.props.calculateMinimumRequiredIncome()) *
      (this.props.state.targetAge - this.props.state.currentAge)
    ).toLocaleString();
  };

  // Cumulative expenses by target age
  handleCumulativeExpensesByTarget = () => {
    return (
      this.props.calculateYearlyExpenses() *
      (this.props.state.targetAge - this.props.state.currentAge)
    ).toLocaleString();
  };

  // Effect of expenses on income
  handleExpensesEffectOnIncome = () => {
    return (
      this.props.calculateYearlyExpenses() *
      (100 / this.props.calculateSalaryAfterTaxes())
    ).toFixed(2);
  };

  // Render the badge of effect of expenses on income dynamically
  handleExpensesEffectOnIncomeBadge = () => {
    // 100%+
    if (
      this.props.calculateYearlyExpenses() *
        (100 / this.props.calculateSalaryAfterTaxes()) >=
      100
    ) {
      return "text-danger";
    }
    // 49% - 99%
    if (
      this.props.calculateYearlyExpenses() *
        (100 / this.props.calculateSalaryAfterTaxes()) >
        49 &&
      this.props.calculateYearlyExpenses() *
        (100 / this.props.calculateSalaryAfterTaxes()) <
        100
    ) {
      return "text-warning";
    }
    // 0% - 49%
    if (
      this.props.calculateYearlyExpenses() *
        (100 / this.props.calculateSalaryAfterTaxes()) >
        0 &&
      this.props.calculateYearlyExpenses() *
        (100 / this.props.calculateSalaryAfterTaxes()) <
        50
    ) {
      return "text-success";
    }
  };

  // Handlers for yearly maximum allowable spend
  handleYearlyMaxSpendToTargetBadge = () => {
    return this.props.calculateYearlyMaxSpendToTarget() > 0
      ? "text-success"
      : "text-danger";
  };

  handleMonthlyMaxSpendToTargetBadge = () => {
    return this.props.calculateYearlyMaxSpendToTarget() / 12 > 0
      ? "text-success"
      : "text-danger";
  };

  calculateYearlyMaxSpendToNoDebtBadge = () => {
    return this.props.calculateYearlyMaxSpendToNoDebt() > 0
      ? "text-success"
      : "text-danger";
  };

  calculateMonthlyMaxSpendToNoDebtBadge = () => {
    return this.props.calculateYearlyMaxSpendToNoDebt() / 12 > 0
      ? "text-success"
      : "text-danger";
  };

  // Handlers for duration of net worth (Target/Current)
  calculateDurationOfTargetNetBadge = () => {
    return this.props.calculateDurationOfTargetNet().includes("months")
      ? "text-warning"
      : "text-info";
  };

  calculateDurationOfCurrentNetBadge = () => {
    return this.props.calculateDurationOfCurrentNet().includes("months")
      ? "text-warning"
      : "text-info";
  };

  render() {
    return (
      <React.Fragment>
        <div id="summary-div">{this.props.renderSummary()}</div>
        <div
          id="summaryLeft-div"
          className={this.props.handleDetailedSummaryDeactivation()}
        >
          {/* INCOME Summary */}
          <div className="detailedSummaryElement">
            <h5 className="text-center text-light bg-dark detailedSummaryHeader">
              <img
                src={incomeLogo}
                className="detailedSummaryIcon"
                alt="income summary"
              />
              Income
            </h5>
            <small className="text-muted">
              <em>BE</em>: before expenses
            </small>
            {/* Monthly income - BE */}
            <p>
              Monthly income (BE):{" "}
              <span className={"text-success"}>
                {this.props.state.currencyIcon +
                  this.handleMonthlyIncomeGross()}
              </span>
              .
            </p>
            {/* Daily income - BE */}
            <p>
              Daily income (BE):{" "}
              <span className="text-success">
                {this.props.state.currencyIcon + this.handleDailyIncomeGross()}
              </span>
              .
            </p>
            <small className="text-muted">
              <em>AE</em>: after expenses
            </small>
            {/* Monthly income - AE */}
            <p>
              Monthly income (AE):{" "}
              <span className={this.handleMonthlyIncomeNetBadge()}>
                {this.props.state.currencyIcon + this.handleMonthlyIncomeNet()}
              </span>
              .
            </p>
            {/* Daily income - AE */}
            <p>
              Daily income (AE):{" "}
              <span className={this.handleDailyIncomeNetBadge()}>
                {this.props.state.currencyIcon + this.handleDailyIncomeNet()}
              </span>
              .
            </p>
          </div>
          {/* TARGET Summary */}
          <div className="detailedSummaryElement">
            <h5 className="text-center text-light bg-dark detailedSummaryHeader">
              <img
                src={targetLogo}
                className="detailedSummaryIcon"
                alt="target summary"
              />
              Target
            </h5>
            {/* Impact of current net on target net */}
            <p
              data-toggle="tooltip"
              title="How much, in percentage, the current net worth contributes to the target."
            >
              Impact of current net on target net:{" "}
              <span className="text-info">
                {this.handleImpactOnNet() + "%"}
              </span>
              .
            </p>
            {/* Minimum net salary to reach target */}

            <p>
              Minimum net salary to reach target:{" "}
              <span className="text-info">
                {this.props.state.currencyIcon +
                  this.handleMinimumNetToTarget()}
              </span>
              .
            </p>
            {/* Surplus money after target reached */}
            <p>
              Surplus money after target reached:{" "}
              <span className="text-success">
                {this.props.state.currencyIcon +
                  this.handleSurplusAfterTarget()}
              </span>
              .
            </p>
            {/* Cumulative expenses by target age */}
            <p>
              Cumulative expenses by target age:{" "}
              <span className="text-info">
                {this.props.state.currencyIcon +
                  this.handleCumulativeExpensesByTarget()}
              </span>
              .
            </p>
            {/* Breakdown of expenses by target age */}
            <ul class="list-group">
              Breakdown of expenses by target age:
              {/* Food */}
              <li class="list-group-item list-group-item-secondary">
                <small>
                  Food:{" "}
                  <span className="text-info">
                    {this.props.state.currencyIcon +
                      (
                        this.props.state.foodExpenses *
                        (this.props.state.targetAge -
                          this.props.state.currentAge)
                      ).toLocaleString()}
                  </span>
                </small>
              </li>
              {/* Transportation */}
              <li class="list-group-item list-group-item-secondary">
                <small>
                  Transport:{" "}
                  <span className="text-info">
                    {" "}
                    {this.props.state.currencyIcon +
                      (
                        this.props.state.transportationExpenses *
                        (this.props.state.targetAge -
                          this.props.state.currentAge)
                      ).toLocaleString()}
                  </span>
                </small>
              </li>
              {/* House */}
              <li class="list-group-item list-group-item-secondary">
                <small>
                  House:{" "}
                  <span className="text-info">
                    {" "}
                    {this.props.state.currencyIcon +
                      (
                        this.props.state.houseExpenses *
                        (this.props.state.targetAge -
                          this.props.state.currentAge)
                      ).toLocaleString()}
                  </span>
                </small>
              </li>
              {/* Leisure */}
              <li class="list-group-item list-group-item-secondary">
                <small>
                  Leisure:{" "}
                  <span className="text-info">
                    {" "}
                    {this.props.state.currencyIcon +
                      (
                        this.props.state.leisureExpenses *
                        (this.props.state.targetAge -
                          this.props.state.currentAge)
                      ).toLocaleString()}
                  </span>
                </small>
              </li>
              {/* Beauty */}
              <li class="list-group-item list-group-item-secondary">
                <small>
                  Beauty:{" "}
                  <span className="text-info">
                    {" "}
                    {this.props.state.currencyIcon +
                      (
                        this.props.state.beautyExpenses *
                        (this.props.state.targetAge -
                          this.props.state.currentAge)
                      ).toLocaleString()}
                  </span>
                </small>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="summaryRight-div"
          className={this.props.handleDetailedSummaryDeactivation()}
        >
          {/* EXPENSES Summary */}
          <div className="detailedSummaryElement">
            <h5 className="text-center text-light bg-dark detailedSummaryHeader">
              <img
                src={expensesLogo}
                className="detailedSummaryIcon"
                alt="income summary"
              />
              Expenses
            </h5>
            {/* Effect of expenses on income */}
            <p>
              Effect on income:{" "}
              <span className={this.handleExpensesEffectOnIncomeBadge()}>
                {this.handleExpensesEffectOnIncome() + "%"}
              </span>
              .
            </p>
            <p>
              Yearly expenses:{" "}
              <span className="text-info">
                {this.props.state.currencyIcon +
                  this.props.calculateYearlyExpenses().toLocaleString()}
              </span>
              .
            </p>
            {/* Yearly maximum allowable spend to reach target */}
            <p>
              Yearly MAS (to target met):{" "}
              <span className={this.handleYearlyMaxSpendToTargetBadge()}>
                {this.props.state.currencyIcon +
                  this.props.calculateYearlyMaxSpendToTarget().toLocaleString()}
              </span>
            </p>
            {/* Monthly maximum allowable spend to reach target */}
            <p>
              Monthly MAS (to target met){" "}
              <span className={this.handleMonthlyMaxSpendToTargetBadge()}>
                {this.props.state.currencyIcon +
                  (
                    this.props.calculateYearlyMaxSpendToTarget() / 12
                  ).toLocaleString()}
              </span>
            </p>
            {/* Yearly maximum allowable spend to noDebts */}
            <p>
              Yearly MAS (Debt-free by target age):{" "}
              <span className={this.calculateYearlyMaxSpendToNoDebtBadge()}>
                {this.props.state.currencyIcon +
                  this.props.calculateYearlyMaxSpendToNoDebt().toLocaleString()}
              </span>
            </p>
            {/* Monthly maximum allowable spend to noDebts */}
            <p>
              Monthly MAS (Debt-free by target age){" "}
              <span className={this.calculateMonthlyMaxSpendToNoDebtBadge()}>
                {this.props.state.currencyIcon +
                  (
                    this.props.calculateYearlyMaxSpendToNoDebt() / 12
                  ).toLocaleString()}
              </span>
            </p>
            <small className="text-muted">
              <em>MAS</em>: maximum affordable spend
              <br />
              <strong>Note:</strong> all the MAS don't take into account the
              current expenses; use them to calculate your expenses from
              scratch!
            </small>
          </div>
          {/* OTHER Summary */}
          <div className="detailedSummaryElement">
            <h5 className="text-center text-light bg-dark detailedSummaryHeader">
              <img
                src={otherLogo}
                className="detailedSummaryIcon"
                alt="target summary"
              />
              Other
            </h5>
            {/* Duration of target net worth */}
            <p>
              Target net worth would last:{" "}
              <span className={this.calculateDurationOfTargetNetBadge()}>
                {this.props.calculateDurationOfTargetNet()}
              </span>
            </p>
            {/* Duration of current net worth */}
            <p>
              Current net worth would last:{" "}
              <span className={this.calculateDurationOfCurrentNetBadge()}>
                {this.props.calculateDurationOfCurrentNet()}
              </span>
            </p>
            {/* Time left to become a millionaire */}
            <p>
              Time to become a millionaire:{" "}
              <span className="text-success">
                {this.props.calculateTimeToMillionaire()}
              </span>{" "}
            </p>
            {/* Yearly savings by expenses reduction */}
            <ul class="list-group">
              Yearly savings by % of expenses reduction:
              {/* 5% */}
              <li class="list-group-item list-group-item-secondary">
                <small>
                  5%:{" "}
                  <span className="text-info">
                    {this.props.state.currencyIcon +
                      this.props.calculateSavingsByExpensesReduction(5)}
                  </span>
                </small>
                {/* 10% */}
              </li>
              <li class="list-group-item list-group-item-secondary">
                <small>
                  10%:{" "}
                  <span className="text-info">
                    {this.props.state.currencyIcon +
                      this.props.calculateSavingsByExpensesReduction(10)}
                  </span>
                </small>
                {/* 15% */}
              </li>
              <li class="list-group-item list-group-item-secondary">
                <small>
                  15%:{" "}
                  <span className="text-info">
                    {this.props.state.currencyIcon +
                      this.props.calculateSavingsByExpensesReduction(15)}
                  </span>
                </small>
                {/* 20% */}
              </li>
              <li class="list-group-item list-group-item-secondary">
                <small>
                  20%:{" "}
                  <span className="text-info">
                    {this.props.state.currencyIcon +
                      this.props.calculateSavingsByExpensesReduction(20)}
                  </span>
                </small>
              </li>
              {/* 25% */}
              <li class="list-group-item list-group-item-secondary">
                <small>
                  25%:{" "}
                  <span className="text-info">
                    {this.props.state.currencyIcon +
                      this.props.calculateSavingsByExpensesReduction(25)}
                  </span>
                </small>
              </li>
            </ul>
            <small className="text-muted">
              How much extra money could be saved yearly reducing the expenses
              by the given percentage.
            </small>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Summary;
