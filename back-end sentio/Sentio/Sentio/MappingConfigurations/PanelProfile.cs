using AutoMapper;
using Sentio.Entities;
using Sentio.Models;
using Sentio.Models.Panel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.MappingConfigurations
{
    public class PanelProfile : Profile
    {
        public PanelProfile()
        {
            CreateMap<PanelQuery, PanelQueryModel>();
            //  .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.));
            CreateMap<PanelQueryModel, PanelQuery>();

            CreateMap<Panel, PanelModel>();
            CreateMap<PanelModel, Panel>();

            //CreateMap<QueryCondition, QueryConditionModel>()
            //    .ForMember(dest => dest.FilterValue, opt => opt.MapFrom(src => src.Value))
            //    .ForMember(dest => dest.FilterOption, opt => opt.MapFrom(src => src.ConditionType))
            //    //.ForMember(dest => dest.TableProperty, opt => opt.MapFrom(src => src.CollumnProperty))
            //    .ForMember(dest => dest.TableProperty.Id, opt => opt.MapFrom(src => src.CollumnPropertyId));

            //CreateMap<TableQueryConditions, TrackableQuery>()
            //    .ForMember(dest => dest.OperationType, opt => opt.MapFrom(src => src.Operation))
            //    // .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //    .ForMember(dest => dest.QueryConditions, opt => opt.MapFrom(src => src.Conditions));
            //.ForMember(dest => dest.Operation, opt => opt.MapFrom(src => src.OperationType))
            //.ForMember(dest => dest.TableId, opt => opt.MapFrom(src => src.TableId))
            //.ForMember(dest => dest.Conditions, opt => opt.MapFrom(src => src.QueryConditions));

        }

    }
}