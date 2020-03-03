using AutoMapper;
using Sentio.Context;
using Sentio.Services.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class QueryService : IQueryService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;

        public QueryService(SentioContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }


    }
}
