using Sentio.Context;
using Sentio.DTO;
using Sentio.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class DatabaseDataService
    {
        private readonly SentioContext _context;
        public DatabaseDataService(SentioContext context) {
            _context = context;
        }

        public async void AddDatabase(DatabaseConnection data)
        {
            


            string query = "SELECT DB_NAME() AS [Current Database];";
            SqlCommand command;
            SqlDataReader reader;
          //  _context.Databases.Add();
            await _context.SaveChangesAsync();
        }


        // ateis prides duombaze i table ir tada kreiptis i 
        // GetAllTablesData ir uzpildyti tableData tablus
 
    }
}
