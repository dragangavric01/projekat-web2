using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common {
    public enum ResultMetadata {
        Success = 0,
        Exception = 1,
        UsernameConflict = 2,
        EmailConflict = 3,
        LogInFailed = 4,
        AlreadyAccepted = 5
    }

    public class Result<T> {
        public T Data { get; set; }
        public ResultMetadata Metadata { get; set; }

        public Result() {
        }

        public Result(T data, ResultMetadata metadata) {
            Data = data;
            Metadata = metadata;
        }

        public Result(ResultMetadata metadata) {
            Metadata = metadata;
        }
    }
}
