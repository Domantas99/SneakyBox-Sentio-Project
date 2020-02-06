using AutoMapper;
using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.MappingConfigurations
{
    public class TableProfile : Profile
    {
        public TableProfile() {

            CreateMap<TableProperty, CollumnProperty>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.CollumnType))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.CollumnName));

            CreateMap<TableModel, Table>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.TableName))
                .ForMember(dest => dest.CollumnProperties, opt => opt.MapFrom(src => src.Properties));
        }
    }
}