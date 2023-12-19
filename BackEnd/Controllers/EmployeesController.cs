using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        public readonly IConfiguration Configuration;
        private readonly SqlConnection _con;
        public EmployeesController(IConfiguration configuration)
        {
            Configuration = configuration;
            _con = new SqlConnection(Configuration.GetConnectionString("Employess"));
        }


        [HttpGet]
        public ActionResult<List<Employee>> GetEmployees()
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM EMPLOYEES", _con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Employee> list = new List<Employee>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Employee employee = new Employee();
                    employee.EmployeeID = Convert.ToInt32(dt.Rows[i]["EmployeeID"]);
                    employee.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    employee.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    employee.Position = Convert.ToString(dt.Rows[i]["Position"]);
                    employee.Department = Convert.ToString(dt.Rows[i]["Department"]);
                    employee.ContactNumber = Convert.ToString(dt.Rows[i]["ContactNumber"]);
                    employee.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    list.Add(employee);
                }

                return list;
            }
            else
            {
                return NotFound(); // Use NotFound for HTTP 404
            }
        }


        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployee(int id)
        {
            SqlDataAdapter da = new SqlDataAdapter($"SELECT * FROM EMPLOYEES WHERE EmployeeID = {id}", _con);
            DataTable dt = new DataTable();
            da.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                Employee employee = new Employee();
                employee.EmployeeID = Convert.ToInt32(dt.Rows[0]["EmployeeID"]);
                employee.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                employee.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                employee.Position = Convert.ToString(dt.Rows[0]["Position"]);
                employee.Department = Convert.ToString(dt.Rows[0]["Department"]);
                employee.ContactNumber = Convert.ToString(dt.Rows[0]["ContactNumber"]);
                employee.Email = Convert.ToString(dt.Rows[0]["Email"]);
                return employee;
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult<Employee> PostEmployee(EmployeeDTO employee)
        {
            SqlCommand cmd = new SqlCommand("SELECT max(EmployeeID) FROM EMPLOYEES", _con);
            cmd.CommandType = CommandType.Text;
            _con.Open();
            int newID;
            var temp = cmd.ExecuteScalar();
            if (temp == DBNull.Value)
            {
                newID = 1;
            }
            else
            {
                newID = Convert.ToInt32(temp) + 1;
            }


            Employee emp = Employee.toEmployee(employee, newID);

            string query = $"INSERT INTO Employees (EmployeeID,FirstName,LastName,Position,Department,ContactNumber,Email) " +
                "VALUES (@EmployeeID,@FirstName,@LastName,@Position,@Department,@ContactNumber,@Email)";

            using (SqlCommand command = new SqlCommand(query, _con))
            {
                command.Parameters.AddWithValue("@EmployeeID", $"{emp.EmployeeID}");
                command.Parameters.AddWithValue("@FirstName", $"{emp.FirstName}");
                command.Parameters.AddWithValue("@LastName", $"{emp.LastName}");
                command.Parameters.AddWithValue("@Position", $"{emp.Position}");
                command.Parameters.AddWithValue("@Department", $"{emp.Department}");
                command.Parameters.AddWithValue("@ContactNumber", $"{emp.ContactNumber}");
                command.Parameters.AddWithValue("@Email", $"{emp.Email}");
                int result = command.ExecuteNonQuery();

                // Check Error
                if (result < 0)
                {
                    _con.Close();
                    return BadRequest();
                }
                _con.Close();
                return Ok(emp);
            }
        }


        [HttpPut("{id}")]
        public ActionResult<int> PutEmployee(EmployeeDTO emp, int id)
        {
            string query = "UPDATE Employees SET FirstName = @FirstName,LastName = @LastName,Position = @Position " +
                ",Department = @Department,ContactNumber = @ContactNumber,Email = @Email WHERE EmployeeID = @EmployeeID";
            _con.Open();

            using (SqlCommand command = new SqlCommand(query, _con))
            {
                command.Parameters.AddWithValue("@EmployeeID", $"{id}");
                command.Parameters.AddWithValue("@FirstName", $"{emp.FirstName}");
                command.Parameters.AddWithValue("@LastName", $"{emp.LastName}");
                command.Parameters.AddWithValue("@Position", $"{emp.Position}");
                command.Parameters.AddWithValue("@Department", $"{emp.Department}");
                command.Parameters.AddWithValue("@ContactNumber", $"{emp.ContactNumber}");
                command.Parameters.AddWithValue("@Email", $"{emp.Email}");
                int result = command.ExecuteNonQuery();

                // Check Error
                if (result < 0)
                {
                    _con.Close();
                    return BadRequest();
                }
                _con.Close();
                return Ok(id);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteEmployee(int id)
        {

            _con.Open();

            string deletePicturesQuery = "DELETE FROM EmployeeProfilePictures WHERE EmployeeID = @EmployeeID";

            using (SqlCommand deletePicturesCommand = new SqlCommand(deletePicturesQuery, _con))
            {
                deletePicturesCommand.Parameters.AddWithValue("@EmployeeID", id);
                deletePicturesCommand.ExecuteNonQuery();
            }
            string query = "DELETE FROM Employees WHERE EmployeeID = @EmployeeID";

            try
            {

                using (SqlCommand command = new SqlCommand(query, _con))
                {
                    command.Parameters.AddWithValue("@EmployeeID", id);
                    int result = command.ExecuteNonQuery();

                    if (result > 0)
                    {
                        // Rows were affected, meaning the employee was deleted successfully
                        return Ok(id);
                    }
                    else
                    {
                        // No rows were affected, but it doesn't necessarily indicate an error
                        return NotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details for debugging
                Console.Error.WriteLine(ex);
                return BadRequest(new { error = $"Failed to delete employee. {ex}" });
            }
            finally
            {
                _con.Close();
            }
        }
    }
}