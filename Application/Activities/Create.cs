using System.Net.Mime;
using System;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Domain;
using Persistence;
using MediatR;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        { 
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>  
        {
            private readonly DataContext _context;

            public Handler(DataContext context) 
            {
            _context = context;
                
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 _context.Activities.Add(request.Activity);

                 await _context.SaveChangesAsync();

                 return Unit.Value;
            }
        }
    }
}