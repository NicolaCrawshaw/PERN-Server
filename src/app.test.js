// Mock the db module
const mockQuery = jest.fn();
jest.mock("./services/db", () => ({
  query: mockQuery,
}));

const request = require("supertest");
const app = require("./app");

describe("app", () => {
  it("should get all the todos", async () => {
    // Mock the db module
    const mockQueryResult = {
      rows: [
        {
          id: 1,
          name: "First to do",
        },
        {
          id: 2,
          name: "Second to do",
        },
      ],
    };
    mockQuery.mockResolvedValue(mockQueryResult);

    // Call the API endpoint using supertest
    const response = await request(app).get("/api/todos");

    // Check we get the correct response from the API endpoint
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockQueryResult.rows);
  });

  it("should create a new todo", async () => {
    // Mock the body of the POST request
    const mockPostBody = {
      description: "New todo description",
    };

    // Mock the result from the db module
    const mockQueryResult = {
      rows: [{ id: 1, ...mockPostBody }],
    };
    mockQuery.mockResolvedValue(mockQueryResult);

    // Call the API endpoint using supertest
    const response = await request(app).post("/api/todos").send(mockPostBody);

    // Check we get the correct response from the API endpoint
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockQueryResult.rows[0]);
  });
});
