using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApiWithAngular.Models;

namespace ApiWithAngular.Controllers
{
    [RoutePrefix("Api/Employee")]
    public class CrudController : ApiController
    {
        NorthwindEntities objEntity  = new NorthwindEntities();

        [HttpGet]
        [Route("AllEmployeeDetails")]
        public IQueryable<EmployeDetail> GetEmaployee()
        {
            try
            {
                return objEntity.EmployeDetails;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetEmployeeDetailsById/{employeeId}")]
        public IHttpActionResult GetEmaployeeById(string employeeId)
        {
            EmployeDetail objEmp = new EmployeDetail();
            int ID = Convert.ToInt32(employeeId);
            try
            {
                objEmp = objEntity.EmployeDetails.Find(ID);
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertEmployeeDetails")]
        public IHttpActionResult PostEmaployee(EmployeDetail data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objEntity.EmployeDetails.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }



            return Ok(data);
        }

        [HttpPut]
        [Route("UpdateEmployeeDetails")]
        public IHttpActionResult PutEmaployeeMaster(EmployeDetail employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                EmployeDetail objEmp = new EmployeDetail();
                objEmp = objEntity.EmployeDetails.Find(employee.EmpID);
                if (objEmp != null)
                {
                    objEmp.EmpName = employee.EmpName;
                    objEmp.Address = employee.Address;
                    objEmp.EmailID = employee.EmailID;
                    objEmp.DateOfBirth = employee.DateOfBirth;
                    objEmp.Gender = employee.Gender;
                    objEmp.PinCode = employee.PinCode;

                }
                int i = this.objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(employee);
        }
        [HttpDelete]
        [Route("DeleteEmployeeDetails")]
        public IHttpActionResult DeleteEmaployeeDelete(int id)
        {
            //int empId = Convert.ToInt32(id);  
            EmployeDetail emaployee = objEntity.EmployeDetails.Find(id);
            if (emaployee == null)
            {
                return NotFound();
            }

            objEntity.EmployeDetails.Remove(emaployee);
            objEntity.SaveChanges();

            return Ok(emaployee);
        }
    }
}

