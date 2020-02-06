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

        public async void AddDatabase(Database database)
        {

            _context.Databases.Add(database);
            await _context.SaveChangesAsync();
        }

    }
}
