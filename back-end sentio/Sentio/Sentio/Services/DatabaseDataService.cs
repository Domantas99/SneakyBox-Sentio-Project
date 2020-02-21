using AutoMapper;
using Sentio.Context;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Models;
using Sentio.RequestResults;
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
           // var db = _context.Databases.FirstOrDefault(x=> x.ConnectionString == database.ConnectionString);
            //if (db == null)
            
                var newDb = _context.Databases.Add(_mapper.Map<Database>(database));
                await _context.SaveChangesAsync();
                return newDb.Entity.Id;
            //}
            //return newDb.Id;    
        }

        public async Task<ResponseResult<DatabaseViewModel>> RemoveDatabase(Guid databaseId)
        {
            var db = _context.Databases.FirstOrDefault(x => x.Id == databaseId);
            if (db != null)
            {
                await RemoveDatabaseTables(databaseId);
                _context.Databases.Remove(db as Database);
                
                await _context.SaveChangesAsync();
                return new ResponseResult<DatabaseViewModel> {IsValid=true, Message = "Success", ReturnResult = _mapper.Map<DatabaseViewModel>(db) };
            }
            return new ResponseResult<DatabaseViewModel> { IsValid = false, Message = "There was an error", ReturnResult = null };
        }

        public async Task RemoveDatabaseTables(Guid databaseId) {
            var tables = _context.Tables.Where(table => table.DatabaseId == databaseId);
            foreach (var table in tables) {
                await RemoveTableCollumns(table.Id);
                _context.Tables.Remove(table as Table);
                
            }
            //await _context.SaveChangesAsync();
        }

        public async Task RemoveTableCollumns(Guid tableId) {
            var collumnProperties = _context.CollumnProperties.Where(x => x.TableId == tableId);
            foreach (var prop in collumnProperties) {
                _context.CollumnProperties.Remove(prop as CollumnProperty);
            }
            //await _context.SaveChangesAsync();
        }


        public async Task<DatabaseViewModelsListResult> GetAllDatabasesByUserId(Guid userId)
        {
            var databases = _context.Databases.Where(db => db.UserId == userId);
            
            if (databases.Count() > 0)
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
