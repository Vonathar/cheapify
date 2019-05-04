import React, { Component } from "react";
import youngManImage from "../img/man-young.png";

/* The Target component returns a form which allows the user to input the values related to the target settings (Age / Net worth). */
class Target extends Component {
  render() {
    return (
      <form
        id="target-form"
        className={this.props.handleDetailedSummaryActivation()}
      >
        {/* Text input for the current age */}
        <div className="form-group target-input">
          <label htmlFor="currentAgeInput">
            <img src={youngManImage} className="target-icon" alt="man icon" />
            Current age
          </label>
          <input
            type="text"
            className="form-control form-control-sm target-textInput"
            id="currentAgeInput"
            placeholder="18..."
            onChange={this.props.handleTargetInput}
          />
        </div>
        {/* Range input for the target age */}
        <div className="form-group target-input">
          <label htmlFor="targetAgeInput">Target age</label>
          <input
            type="range"
            className="form-control-range"
            id="targetAgeInput"
            min="10"
            max="100"
            onChange={this.props.handleTargetInput}
          />
          <input
            type="text"
            className={this.props.handleTextInputsActivationTargets()}
            id="targetAgeInput"
            onChange={this.props.handleTargetInput}
          />
          <small
            id="targetAgeHelp"
            className="form-text text-muted target-help"
          >
            {this.props.handleTargetAgeText()} years old.
          </small>
        </div>
        {/* Text input for the current net worth */}
        <div className="form-group target-input">
          <label htmlFor="currentNetInput">Current net worth</label>
          <input
            type="text"
            className="form-control form-control-sm target-textInput"
            id="currentNetInput"
            placeholder="5000..."
            onChange={this.props.handleTargetInput}
          />
          <small
            id="incomeInputHelp"
            className="form-text text-muted target-help"
          >
            Please do not use signs to separate digits.
          </small>
        </div>
        {/* Range input for the target net worth */}
        <div className="form-group , target-input">
          <label htmlFor="targetNetInput">Target net worth</label>
          <input
            type="range"
            value={this.props.targetNet}
            className="form-control-range"
            id="targetNetInput"
            min="0"
            max="2000000"
            onChange={this.props.handleTargetInput}
          />
          <input
            type="text"
            value={this.props.targetNet}
            className={this.props.handleTextInputsActivationTargets()}
            id="targetNetInput"
            onChange={this.props.handleTargetInput}
          />
          <small
            id="targetNetHelp"
            className="form-text text-muted target-help"
          >
            {this.props.handleTargetNetText()} £.
          </small>
        </div>
      </form>
    );
  }
}

export default Target;
