import * as consts from "../../constants";

const ID = () => {
	return (
		"_" +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
};

export const updateCurrentProject = payload => ({
	type: consts.UPDATE_CURRENT_PROJECT,
	payload
});
export const trackLocation = payload => {
	payload.block["position"] = payload.deltaPosition;
	return {
		type: consts.TRACK_LOCATION,
		payload
	};
};
export const blockUpdated = payload => {
	payload.block["updated"] = payload.updated;
	return {
		type: consts.BLOCK_UPDATED,
		payload
	};
};
export const deleteLink = payload => ({
	type: consts.DELETE_LINK,
	payload
});
export const blockClicked = payload => ({
	type: consts.BLOCK_CLICKED,
	payload
});
export const selectLink = payload => ({
	type: consts.SELECT_LINK,
	payload
});

export const addBlockToProject = payload => {
	payload.id = ID();
	return {
		type: consts.ADD_TO_PROJECT,
		payload
	};
};
export const updateBlockValue = payload => {
	if (payload.key === "frequency" || payload.key === "amplitude") {
		if (payload.value > 0) {
			payload.block[payload.key] = payload.value;
		}
	} else {
		payload.block[payload.key] = payload.value;
	}
	return {
		type: consts.UPDATE_BLOCK,
		payload
	};
};
export const updateDropDown = payload => ({
	type: consts.UPDATE_DROPDOWN,
	payload
});
export const pauseBlock = payload => {
	payload.block.paused = !payload.block.paused;
	return {
		type: consts.PAUSE_BLOCK,
		payload
	};
};
export const updateData = payload => ({
	type: consts.UPDATE_DATA,
	payload
});
