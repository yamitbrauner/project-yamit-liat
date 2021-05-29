package com.openu.project;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityTests {
	@Autowired
	private MockMvc mvc;

//	@Autowired
//	private TestRestTemplate restTemplate;

	public loginResponseDto getUserToken(String username, String password) throws Exception {
		final String SIGN_IN_URL = "/api/services/controller/user/login";

		loginDto login = new loginDto();
		login.setMail(username);
		login.setPassword(password);

		Gson gson = new Gson();
		String loginJson = gson.toJson(login);

		MvcResult result = mvc.perform(get(SIGN_IN_URL)
				.contentType(MediaType.APPLICATION_JSON).content(loginJson))
				.andExpect(status().isOk()).andReturn();

		String response = result.getResponse().getContentAsString();
		//System.out.println(result.getResponse().getContentAsString());

		loginResponseDto loginResponse = new loginResponseDto();
		String userId = JsonPath.parse(response).read("userId").toString();
		String token = JsonPath.parse(response).read("token").toString();
		loginResponse.setToken(token);
		loginResponse.setUserId(userId);
		return loginResponse;

	}

	// Only login test
	@Test
	void loginTest() throws Exception {
		final String USERNAME = "liat.arama1@gmail.com";
		final String PASSWORD = "1234";
		loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);
	}

	// Login and trying the token on the user specific URL
	@Test
	void loginAndAuthorizationTest() throws Exception {
		final String USERNAME = "liat.arama1@gmail.com";
		final String PASSWORD = "1234";

		// Login
		loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);

		// 2nd test phase, Authorize User specific zone
		final String USER_RESERVATION_URL = "/user/" + loginResponse.getUserId() + "/getFullUserReservation";
		// Get full reservation
		MvcResult resultReservation = mvc.perform(get(USER_RESERVATION_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + loginResponse.getToken()))
				.andExpect(status().isOk()).andReturn();

		String responseReservation = resultReservation.getResponse().getContentAsString();
		System.out.println(responseReservation);
	}

	// Login with admin user and trying the token on ADMIN url
	@Test
	void loginAndAuthorizationAdminTest() throws Exception {

		final String USERNAME = "liat.arama1@gmail.com";
		final String PASSWORD = "1234";

		// Login
		loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);

		// Authorize admin specific zone
		final String SOME_ADMIN_URL = "/admin/allUsersFullReservation";
		// Get full users reservation
		MvcResult resultAdmin = mvc.perform(get(SOME_ADMIN_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + loginResponse.getToken()))
				.andExpect(status().isOk()).andReturn();

		String responseAdmin = resultAdmin.getResponse().getContentAsString();
		System.out.println(responseAdmin);
	}

	// Login with simple user and trying the token on ADMIN url (return 403 status)
	@Test
	void userAttemptingAccessAdminUrl() throws Exception {
		final String USERNAME = "noyamit1212@walla.com";
		final String PASSWORD = "654321";
		// Login
		loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);

		// Authorize admin specific zone
		final String SOME_ADMIN_URL = "/admin/allUsersFullReservation";
		// Get full users reservation
		MvcResult resultAdmin = mvc.perform(get(SOME_ADMIN_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + loginResponse.getToken()))
				.andExpect(status().isForbidden()).andReturn();

		String responseAdmin = resultAdmin.getResponse().getContentAsString();
		System.out.println(responseAdmin);
	}

	// Login with one user and trying the token on other user url (return 403 status)
	@Test
	void userAttemptingAccessOtherUserUrl() throws Exception {
		final String USERNAME = "noyamit1212@walla.com";
		final String PASSWORD = "654321";

		// Login
		loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);

		String otherUserId = loginResponse.userId.equals("1") ? "2" : "1";

		// 2nd test phase, Authorize User specific zone
		final String USER_RESERVATION_URL = "/user/" + otherUserId + "" + "/getFullUserReservation";
		// Get full reservation
		MvcResult resultReservation = mvc.perform(get(USER_RESERVATION_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + loginResponse.getToken()))
				.andExpect(status().isForbidden()).andReturn();

		String responseReservation = resultReservation.getResponse().getContentAsString();
		System.out.println(responseReservation);
	}

	// Login with admin user but not using the token, using made up one
	@Test
	void authorizeWithWrongTokenTest() throws Exception {
		final String USERNAME = "liat.arama1@gmail.com";
		final String PASSWORD = "1234";
		final String WRONG_TOKEN = "lalallalalalallala";
		// Login
		loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);

		// Authorize User specific zone with wrong token!
		final String USER_RESERVATION_URL = "/user/" + loginResponse.getUserId() + "/getFullUserReservation";
		// Get full reservation
		mvc.perform(get(USER_RESERVATION_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + WRONG_TOKEN))
				.andExpect(status().isForbidden()).andReturn();
	}
}