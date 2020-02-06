using Sentio.Context;
using Sentio.Entities;
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
        public TableDataService(SentioContext context)
        {
            _context = context;
        }

        public async void AddTable(Table table)
        {
            
        }

    }
}
