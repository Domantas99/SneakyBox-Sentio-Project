using Sentio.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class TableModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid DatabaseId { get; set; }
        public string TableName { get; set; }
        public List<TableProperty> Properties { get; set; }

        public TableModel(string name) {
            TableName = name;
            Properties = new List<TableProperty>();
        }

        public TableModel(Guid tableId, Guid dbId, string tableName, List<TableProperty> tableProperties)
        {
            Id = tableId;
            DatabaseId = dbId;
            TableName = tableName;
            Properties = tableProperties;
        }


        public void AddProperty(TableProperty prop) {
            Properties.Add(prop);
        }
    }
}