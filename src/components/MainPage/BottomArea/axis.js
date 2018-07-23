import React from "react";
import { select } from "d3-selection";
import PropTypes from "prop-types";

export class Axis extends React.Component {
	constructor(props) {
		super(props);
		this.renderAxis = this.renderAxis.bind(this);
	}

	componentDidMount() {
		this.renderAxis();
	}

	componentDidUpdate() {
		this.renderAxis();
	}

	renderAxis() {
		const { scale, axis, tickValues } = this.props;
		const node = this.refs.axis;
		const axisFn = axis(scale).tickValues(tickValues);
		axisFn(select(node));
	}

	render() {
		return <g ref="axis" transform={this.props.transform} />;
	}
}

Axis.propTypes = {
	scale: PropTypes.func,
	axis: PropTypes.func,
	tickValues: PropTypes.array
};
