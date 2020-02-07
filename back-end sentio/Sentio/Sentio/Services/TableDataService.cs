using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sentio.Context;
using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class TableDataService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;
        public TableDataService(SentioContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ICollection<TableModel>> GetTables(Guid databaseId) {
            var db = _context.Databases.FirstOrDefault(d => d.Id == databaseId);
            if (db != null)
            {
                var tables = _context.Tables.Where(t => t.DatabaseId == databaseId).Include(t=>t.CollumnProperties);
                ICollection<TableModel> tableModels = new List<TableModel>();
                TableModel tableModel;
                foreach (var table in tables) {
                    tableModel = new TableModel(table.Id, table.DatabaseId, table.Name, _mapper.Map<List<TableProperty>>(table.CollumnProperties));
                    tableModels.Add(tableModel);
                }

                return tableModels;   
            }
            
            return null;
        }

        public async Task<Guid> AddTables(ICollection<TableModel> tableModels, Guid dbGuid)
        {
            foreach (TableModel tableModel in tableModels)
            {
                var tableInDb = _context.Tables.FirstOrDefault(t => t.Name == tableModel.TableName && t.DatabaseId == dbGuid);
                        
                if (tableInDb == null) 
                {
                    var table = _mapper.Map<Table>(tableModel);
                    table.DatabaseId = dbGuid;
                    _context.Tables.Add(table);
                    var x = AddCollumnProperties(table.CollumnProperties);
                }

            }
            await _context.SaveChangesAsync();
            return dbGuid;
        }

        public async Task<bool> AddCollumnProperties(ICollection<CollumnProperty> properties)
        {
            bool flag = true;
            foreach (CollumnProperty collumnProperty in properties)
            {
                var property = _context.CollumnProperties.FirstOrDefault(p => p.Name == collumnProperty.Name && p.Id == collumnProperty.Id);
                if (property == null)
                {               
                     _context.CollumnProperties.Add(collumnProperty);
                }
                // Taip pat dar reikės patikrinti ar tipas nepasikeitė.
                //else
                //{ 
                    
                //} 

            }
            return flag;
        }      
    }
}
