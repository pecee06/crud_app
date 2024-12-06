class ApiResponse {
	constructor({ message = "OK", success = true, dets = {} }) {
		this.message = message;
		this.success = success;
		this.dets = dets;
	}
}

export default ApiResponse;
