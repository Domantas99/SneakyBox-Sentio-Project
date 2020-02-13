using AutoMapper;
using Sentio.Context;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class DatabaseDataService: IDatabaseDataService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;
        public DatabaseDataService(SentioContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Guid> AddDatabase(DatabaseViewModel database)
        {
            var db = _context.Databases.FirstOrDefault(x=> x.ConnectionString == database.ConnectionString);
            if (db == null)
            {
                var newDb = _context.Databases.Add(_mapper.Map<Database>(database));
                await _context.SaveChangesAsync();
                return newDb.Entity.Id;
            }
            return db.Id;    
        }

        public async Task<DatabaseViewModelsListResult> GetAllDatabasesByUserId(Guid userId)
        {
            var databases = _context.Databases.Where(db => db.UserId == userId);

            if (databases != null)
            {
                return new DatabaseViewModelsListResult { IsValid = true, Message = "Success", Databases = _mapper.Map<ICollection<DatabaseViewModel>>(databases) };
            }

            return new DatabaseViewModelsListResult { IsValid = false, Message = "No databases with that user ID" };
        }

        public async Task<DatabaseViewModelResult> GetDatabaseByDbId(Guid dbId)
        {
            var db = _context.Databases.FirstOrDefault(database => database.Id == dbId);

            if (db != null)
            {
                return new DatabaseViewModelResult { IsValid = true, Message = "Success", Database = _mapper.Map<DatabaseViewModel>(db) };
            }
            return new DatabaseViewModelResult { IsValid = false, Message = "Database with that ID not found", Database = null };
        }
    }
}
