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
    public class DatabaseDataService
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
    }
}
