using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Generators
{
    public class MSSQLQueryGenerator : IQueryGenerator
    {
        //  isgautos datos generuoti string -> prisijunti, per MSSQLDatabaseProvider/gauti connection prie db -> paduoti to string uzklausa -> grazinti rezultata -> ji issaugoti i panel queriu modeli, kur bus pavadinimas ir query
        public MSSQLQueryGenerator() {
        }

        public string GenerateQuery(TableQueryConditions tableQueryConditions) {
            if (tableQueryConditions.Operation == "COUNT")
            {
                string query = "SELECT COUNT(*) COUNT FROM " + tableQueryConditions.TableName + " WHERE ";
                var conditions = tableQueryConditions.Conditions;
                for (int i = 0; i < conditions.Count; i++)
                {
                    var element = conditions.ElementAt(i);
                    if (element.FilterOption != "No Option")
                    {
                        string condition = element.TableProperty.CollumnName + element.FilterOption + "'" +element.FilterValue + "'";
                        if (i != conditions.Count - 1)
                        {
                            condition += " AND ";
                        }
                        query += condition;
                    }
                }
                query += ";";

                return query;
            }
            else if (tableQueryConditions.Operation == "AVR" && tableQueryConditions.Conditions.Count == 1) {
                var condition = tableQueryConditions.Conditions.ElementAt(0);
                string query = String.Format("SELECT AVR({0}) FROM {1} WHERE {2}{3}{4};",
                    condition.TableProperty.CollumnName, 
                    tableQueryConditions.TableName, 
                    condition.TableProperty.CollumnName,
                    condition.FilterOption, 
                    condition.FilterValue);
                return query;
            }

            return "There was an error generating query";        }
    }
}
