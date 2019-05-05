import React, { Component } from "react";
import foodLogo from "../img/food.png";
import transportationLogo from "../img/transportation.png";
import houseLogo from "../img/house.png";
import leisureLogo from "../img/leisure.png";
import beautyLogo from "../img/beauty.png";

/*
    Render a form accepting user input for the expenses:
      1 - FOOD
      2 - TRANSPORTATION
      3 - HOUSE
      4 - LEISURE
      5 - BEAUTY]
*/

class Expenses extends Component {
  render() {
    return (
      <form
        id="expenses-form"
        className={this.props.handleDetailedSummaryActivation()}
      >
        {/* Range input - FOOD */}
        <div className="form-group , expenses-input">
          <label htmlFor="foodExpenses" className="expenses-label">
            <img src={foodLogo} alt="Food logo" className="expense-icon" />
            Food expenses
          </label>
          <input
            type="range"
            value={this.props.foodExpenses}
            className="form-control-range , expenses-range"
            id="foodExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <input
            type="text"
            value={this.props.foodExpenses}
            className={this.props.handleTextInputsActivationExpenses()}
            id="foodExpenses"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="foodExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {this.props.state.currencyIcon}
            {this.props.handleFoodExpensesText()} per month.
          </small>
        </div>
        {/* Range input - TRANSPORTATION */}
        <div className="form-group , expenses-input">
          <label htmlFor="transportationExpenses" className="expenses-label">
            <img
              src={transportationLogo}
              alt="Transportation logo"
              className="expense-icon"
            />
            Transportation expenses
          </label>
          <input
            type="range"
            value={this.props.transportationExpenses}
            className="form-control-range , expenses-range"
            id="transportationExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <input
            type="text"
            value={this.props.transportationExpenses}
            className={this.props.handleTextInputsActivationExpenses()}
            id="transportationExpenses"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="transportationExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {this.props.state.currencyIcon}
            {this.props.handleTransportationExpensesText()} per month.
          </small>
        </div>
        {/* Range input - HOUSE */}
        <div className="form-group , expenses-input">
          <label htmlFor="houseExpenses" className="expenses-label">
            <img src={houseLogo} alt="House logo" className="expense-icon" />
            Mortgage/Rent expenses
          </label>
          <input
            type="range"
            value={this.props.houseExpenses}
            className="form-control-range , expenses-range"
            id="houseExpenses"
            min="0"
            max="5000"
            onChange={this.props.handleExpensesInput}
          />
          <input
            type="text"
            value={this.props.houseExpenses}
            className={this.props.handleTextInputsActivationExpenses()}
            id="houseExpenses"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="houseExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {this.props.state.currencyIcon}
            {this.props.handleHouseExpensesText()} per month.
          </small>
        </div>
        {/* Range input - LEISURE */}
        <div className="form-group , expenses-input">
          <label htmlFor="leisureExpenses" className="expenses-label">
            <img
              src={leisureLogo}
              alt="Leisure logo"
              className="expense-icon"
            />
            Leisure expenses
          </label>
          <input
            type="range"
            value={this.props.leisureExpenses}
            className="form-control-range , expenses-range"
            id="leisureExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <input
            type="text"
            value={this.props.leisureExpenses}
            className={this.props.handleTextInputsActivationExpenses()}
            id="leisureExpenses"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="leisureExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {this.props.state.currencyIcon}
            {this.props.handleLeisureExpensesText()} per month.
          </small>
        </div>
        {/* Range input - BEAUTY */}
        <div className="form-group , expenses-input">
          <label htmlFor="beautyExpenses" className="expenses-label">
            <img src={beautyLogo} alt="Beauty logo" className="expense-icon" />
            Beauty expenses
          </label>
          <input
            type="range"
            value={this.props.beautyExpenses}
            className="form-control-range , expenses-range"
            id="beautyExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <input
            type="text"
            value={this.props.beautyExpenses}
            className={this.props.handleTextInputsActivationExpenses()}
            id="beautyExpenses"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="beautyExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {this.props.state.currencyIcon}
            {this.props.handleBeautyExpensesText()} per month.
          </small>
        </div>
      </form>
    );
  }
}

export default Expenses;
