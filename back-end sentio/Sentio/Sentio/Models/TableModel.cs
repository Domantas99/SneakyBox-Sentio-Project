using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class TableModel
    {
        public string TableName { get; set; }
        public List<TableProperty> Properties { get; set; }

        public TableModel(string name) {
            TableName = name;
            Properties = new List<TableProperty>();
        }

        public void AddProperty(TableProperty prop) {
            Properties.Add(prop);
        }

    }
}
