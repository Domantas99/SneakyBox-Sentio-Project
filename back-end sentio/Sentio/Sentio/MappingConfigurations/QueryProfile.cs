﻿using AutoMapper;
using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.MappingConfigurations
{
    public class QueryProfile : Profile 
    {
        public QueryProfile() {
            //CreateMap<QueryCondition, QueryConditionModel>()
            //    .ForMember(dest => dest.FilterValue, opt => opt.MapFrom(src => src.Value))
            //    .ForMember(dest => dest.FilterOption, opt => opt.MapFrom(src => src.ConditionType))
            //    //.ForMember(dest => dest.TableProperty, opt => opt.MapFrom(src => src.CollumnProperty))
            //    .ForMember(dest => dest.TableProperty.Id, opt => opt.MapFrom(src => src.CollumnPropertyId));

            //CreateMap<TrackableQuery, TableQueryConditions>()
            //    .ForMember(dest => dest.Operation, opt => opt.MapFrom(src => src.OperationType))
            //    .ForMember(dest => dest.TableId, opt => opt.MapFrom(src => src.TableId))
            //    .ForMember(dest => dest.Conditions, opt => opt.MapFrom(src => src.QueryConditions));

        }

    }
}
