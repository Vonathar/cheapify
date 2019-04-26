import React, { Component } from "react";
import foodLogo from "../img/food.png";
import transportationLogo from "../img/transportation.png";
import houseLogo from "../img/house.png";
import leisureLogo from "../img/leisure.png";
import beautyLogo from "../img/beauty.png";

/*
    The Expenses component returns a form which allows the user to input the values related to the incurred expenses:
        [1 - FOOD  ,  2 - TRANSPORTATION  ,  3 - HOUSE  ,  4 - LEISURE  ,  5 - BEAUTY] 
*/
class Expenses extends Component {
  render() {
    return (
      <form id="expenses-form">
        {/* Range input for the FOOD expenses */}
        <div className="form-group , expenses-input">
          <label htmlFor="foodExpenses">
            <img src={foodLogo} alt="Food logo" className="expense-icon" />
            Food expenses
          </label>
          <input
            type="range"
            value={this.props.foodExpenses}
            className="form-control-range"
            id="foodExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="foodExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {"£"}
            {this.props.handleFoodExpensesText()} per month.
          </small>
        </div>
        {/* Range input for the TRANSPORTATION expenses */}
        <div className="form-group , expenses-input">
          <label htmlFor="transportationExpenses">
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
            className="form-control-range"
            id="transportationExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="transportationExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {"£"}
            {this.props.handleTransportationExpensesText()} per month.
          </small>
        </div>
        {/* Range input for the HOUSE expenses */}
        <div className="form-group , expenses-input">
          <label htmlFor="houseExpenses">
            <img src={houseLogo} alt="House logo" className="expense-icon" />
            Mortgage/Rent expenses
          </label>
          <input
            type="range"
            value={this.props.houseExpenses}
            className="form-control-range"
            id="houseExpenses"
            min="0"
            max="5000"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="houseExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {"£"}
            {this.props.handleHouseExpensesText()} per month.
          </small>
        </div>
        {/* Range input for the LEISURE expenses */}
        <div className="form-group , expenses-input">
          <label htmlFor="leisureExpenses">
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
            className="form-control-range"
            id="leisureExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="leisureExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {"£"}
            {this.props.handleLeisureExpensesText()} per month.
          </small>
        </div>
        {/* Range input for the BEAUTY expenses */}
        <div className="form-group , expenses-input">
          <label htmlFor="beautyExpenses">
            <img src={beautyLogo} alt="Beauty logo" className="expense-icon" />
            Beauty expenses
          </label>
          <input
            type="range"
            value={this.props.beautyExpenses}
            className="form-control-range"
            id="beautyExpenses"
            min="0"
            max="1000"
            onChange={this.props.handleExpensesInput}
          />
          <small
            id="beautyExpensesHelp"
            className="form-text text-muted expenses-help"
          >
            {"£"}
            {this.props.handleBeautyExpensesText()} per month.
          </small>
        </div>
      </form>
    );
  }
}

export default Expenses;
