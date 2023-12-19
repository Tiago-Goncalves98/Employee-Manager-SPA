namespace BackEnd.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }

        public static Employee toEmployee(EmployeeDTO emp, int id)
        {
            Employee emp1 = new Employee();
            emp1.EmployeeID = id;
            emp1.FirstName = emp.FirstName;
            emp1.LastName = emp.LastName;
            emp1.Position = emp.Position;
            emp1.Email = emp.Email;
            emp1.Department = emp.Department;
            emp1.ContactNumber = emp.ContactNumber;
            return emp1;
        }
    }
}
