using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        public readonly IConfiguration Configuration;
        private readonly SqlConnection _con;
        public PictureController(IConfiguration configuration)
        {
            Configuration = configuration;
            _con = new SqlConnection(Configuration.GetConnectionString("Employess"));
        }

        [HttpGet("{id}")]
        public ActionResult GetProfilePicture(int id)
        {
            SqlDataAdapter da = new SqlDataAdapter($"SELECT * FROM EmployeeProfilePictures WHERE EmployeeID = {id}", _con);
            DataTable dt = new DataTable();
            da.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                EmployeeProfilePicture empProfilePicture = new EmployeeProfilePicture();
                byte[] data = (byte[])dt.Rows[0]["ProfilePicture"];
                return File(data, "image/jpeg");
            }
            return NotFound();
        }

        [HttpPost("{id}")]
        public ActionResult UploadProfilePicture(int id,[FromBody]EmployeeProfilePicture pic)
        {
            string query = $"INSERT INTO EmployeeProfilePictures (EmployeeID,ProfilePicture) " +
                "VALUES (@EmployeeID,@ProfilePicture)";
            _con.Open();

            using (SqlCommand command = new SqlCommand(query, _con))
            {
                command.Parameters.AddWithValue("@EmployeeID", id);
                command.Parameters.Add("@ProfilePicture", SqlDbType.VarBinary).Value = Convert.FromBase64String(pic.ProfilePicture);
                int result = command.ExecuteNonQuery();

                // Check Error
                if (result < 0)
                {
                    _con.Close();
                    return BadRequest();
                }
                _con.Close();
                return Ok();
            }
        }

        [HttpPut("{id}")]
        public ActionResult PutProfilePicture(int id, [FromBody] EmployeeProfilePicture pic)
        {
            string query = "UPDATE EmployeeProfilePictures SET EmployeeID = @EmployeeID, ProfilePicture = @ProfilePicture WHERE EmployeeID = @EmployeeID";
            try
            {
                _con.Open();

                using (SqlCommand command = new SqlCommand(query, _con))
                {
                    command.Parameters.AddWithValue("@EmployeeID", $"{id}");
                    command.Parameters.Add("@ProfilePicture", SqlDbType.VarBinary).Value = Convert.FromBase64String(pic.ProfilePicture);
                    int result = command.ExecuteNonQuery();

                    // Check Error
                    if (result < 0)
                    {
                        _con.Close();
                        return BadRequest();
                    }
                    _con.Close();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                // Log the exception details for debugging
                Console.Error.WriteLine(ex);
                return BadRequest(new { error = $"Failed to update employee picture FUCK.{ex}"});
            }
            finally
            {
                _con.Close();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteEmployeePicture(int id)
        {
            string query = "DELETE FROM EmployeeProfilePictures WHERE EmployeeID = @EmployeeID";

            try
            {
                _con.Open();

                using (SqlCommand command = new SqlCommand(query, _con))
                {
                    command.Parameters.AddWithValue("@EmployeeID", id);
                    int result = command.ExecuteNonQuery();

                    if (result > 0)
                    {
                        // Rows were affected, meaning the employee was deleted successfully
                        return Ok(new { message = "Employee picture deleted successfully." });
                    }
                    else
                    {
                        // No rows were affected, but it doesn't necessarily indicate an error
                        return Ok(new { message = "Employee picture not found or already deleted." });
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details for debugging
                Console.Error.WriteLine(ex);
                return BadRequest(new { error = "Failed to delete employee picture." });
            }
            finally
            {
                _con.Close();
            }
        }
    }
}