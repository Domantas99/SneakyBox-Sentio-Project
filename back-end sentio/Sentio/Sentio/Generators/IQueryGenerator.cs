using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Generators
{
    public interface IQueryGenerator
    {
        string GenerateQuery(TableQueryConditions tableQueryConditions);


    }
}
